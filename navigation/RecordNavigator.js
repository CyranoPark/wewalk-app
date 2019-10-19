import React, { Component } from 'react';
import * as Location from 'expo-location';

import RecordStartScreen from '../screens/RecordStartScreen';
import RecordScreen from '../screens/RecordScreen';
import RecordResultScreen from '../screens/RecordResultScreen';

import { postCurrentPath, postImageByLocation, getImageUrl, getCourseData } from '../api';
import { calculateElevation, calculateDistance, createFormData } from '../utils';
import mockData from '../constants/locationData';

class RecordNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseId: null,
      startLocation: {},
      currentLocation: {},
      courseCoordinates: [],
      courseDistance: 0,
      courseElevation: 0,
      totalCourseImages: [],
      totalCoursePath: [],
      totalCourseData: {},
      recordTimers: []
    }
  }

  recordCourse = async () => {
    const { courseCoordinates } = this.state;
    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: 5
    });
    const { latitude, longitude } = currentLocation.coords;
    const currentCoordinate = {
      latitude,
      longitude,
      timestamp: new Date().toISOString()
    };
    if (!courseCoordinates.length) {
      return this.setState({
        courseCoordinates: [ currentCoordinate ],
        currentLocation: currentCoordinate
      });
    }
    const prevLocation = courseCoordinates[courseCoordinates.length - 1];
    const currentElevation = await calculateElevation(prevLocation, currentCoordinate);
    const currentDistance = await calculateDistance(prevLocation, currentCoordinate);

    this.setState({
      courseCoordinates: this.state.courseCoordinates.concat(currentCoordinate),
      courseElevation: this.state.courseElevation + currentElevation,
      courseDistance: this.state.courseDistance + currentDistance
    });
  };

  addCurrentPath = async () => {
    const { courseId, courseCoordinates, courseDistance, courseElevation } = this.state;
    const coursePath = await postCurrentPath(courseId, courseCoordinates, courseDistance, courseElevation);

    this.setState({
      totalCoursePath: coursePath.map(location => {
        return {
          latitude: location.coordinates[0],
          longitude: location.coordinates[1],
          timestamp: location.timestamp
        }
      })
    });
  };

  addImageData = async image => {
    const { currentLocation } = this.state;
    const { courseId } = this.state;
    const locationData = {
      type: 'Point',
      coordinates: [ currentLocation.latitude, currentLocation.longitude ],
      timestamp: currentLocation.timestamp
    }
    const imageUrl = await getImageUrl(courseId, createFormData(image));
    const savedImageData = await postImageByLocation(locationData, courseId, imageUrl)

    this.setState({
      totalCourseImages: this.state.totalCourseImages.concat(savedImageData)
    });
  }

  onStartRecording = (courseId, location) => {
    const { onRecordStartButtonPress } = this.props.screenProps.props;
    const courseRecodingTimer = setInterval(this.recordCourse, 1000);
    const getCourseTimer = setInterval(this.addCurrentPath, 6000);
    const startLocation = {
      latitude: location.coordinates[0],
      longitude: location.coordinates[1],
      timestamp: location.timestamp
    };

    this.setState({
      courseId,
      startLocation,
      currentLocation: startLocation,
      recordTimers: [courseRecodingTimer, getCourseTimer]
    });

    onRecordStartButtonPress();
  };

  onEndRecording = async () => {
    const { onRecordEndButtonPress } = this.props.screenProps.props;
    await this.addCurrentPath();
    const courseData = await getCourseData(this.state.courseId);
    clearInterval(this.state.recordTimers[0]);
    clearInterval(this.state.recordTimers[1]);

    this.setState({
      totalCourseData: courseData
    });

    onRecordEndButtonPress();
  };

  initializeRecordData = () => {
    const { onRecordInitButtonPress } = this.props.screenProps.props;
    this.setState({
      courseId: null,
      startLocation: {},
      currentLocation: {},
      courseCoordinates: [],
      courseDistance: 0,
      courseElevation: 0,
      totalCourseImages: [],
      totalCoursePath: [],
      totalCourseData: {},
      recordTimers: []
    });

    onRecordInitButtonPress();
  };

  render() {
    const {
      courseId,
      startLocation,
      currentLocation,
      totalCourseImages,
      courseDistance,
      courseElevation,
      totalCoursePath,
      totalCourseData
    } = this.state;

    const { recordingStatus } = this.props.screenProps.props;

    switch (recordingStatus) {
      case 'RECORDING':
        return (
          <>
            <RecordScreen
              courseId={courseId}
              startLocation={startLocation}
              currentLocation={currentLocation}
              totalCoursePath={totalCoursePath}
              totalCourseImages={totalCourseImages}
              courseDistance={courseDistance}
              courseElevation={courseElevation}
              onPickImage={this.addImageData}
              onRecordEndButtonPress={this.onEndRecording}
            />
          </>
        );

      case 'AFTER_RECORDING':
        return (
          <RecordResultScreen
            startLocation={startLocation}
            currentLocation={currentLocation}
            totalCoursePath={totalCoursePath}
            totalCourseData={totalCourseData}
            totalCourseImages={totalCourseImages}
            onRecordInitButtonPress={this.initializeRecordData}
          />
        );

      default:
        return (
          <RecordStartScreen
            onRecordStartButtonPress={this.onStartRecording}
          />
        );
    }
  }

}

export default RecordNavigator;
