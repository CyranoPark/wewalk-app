import React, { Component } from 'react';
import * as Location from 'expo-location';

import RecordStartScreen from '../screens/RecordStartScreen';
import RecordScreen from '../screens/RecordScreen';
import RecordResultScreen from '../screens/RecordResultScreen';

import { postCurrentPath, postImageByLocation, getImageUrl, getCourseData, postInitCourse, updateCourseInfo } from '../api';
import { calculateElevation, calculateDistance, createFormData, getAddress } from '../utils';
import mockData from '../constants/locationData';

class RecordNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseId: null,
      startLocation: {},
      currentLocation: {},
      savedCoordinates: [],
      courseDistance: 0,
      courseElevation: 0,
      totalCourseImages: [],
      totalCoursePath: [],
      totalCourseData: {},
      counter: 0
    }
  }

  recordCourse = async () => {
    const { counter, totalCoursePath, startLocation } = this.state;
    const currentLocationData = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = currentLocationData.coords;
    const currentLocation = {
      coordinates: [ longitude, latitude ],
      timestamp: new Date().toISOString()
    };

    const prevLocation = totalCoursePath[totalCoursePath.length - 1];
    const currentElevation = await calculateElevation(startLocation, currentLocation);
    const currentDistance = await calculateDistance(prevLocation, currentLocation);

    this.setState({
      savedCoordinates: this.state.savedCoordinates.concat(currentLocation),
      courseElevation: this.state.courseElevation + currentElevation,
      courseDistance: currentDistance,
      currentLocation,
      totalCoursePath: totalCoursePath.concat(currentLocation),
      counter : counter + 0.00001
    });
  };

  addCurrentPath = async () => {
    const { courseId, savedCoordinates, courseDistance, courseElevation, totalCoursePath } = this.state;
    await postCurrentPath(courseId, savedCoordinates, courseDistance, courseElevation);

    this.setState({
      savedCoordinates: []
    });
  };

  addImageData = async image => {
    const { currentLocation } = this.state;
    const { courseId } = this.state;
    const locationData = {
      type: 'Point',
      coordinates: currentLocation.coordinates,
      timestamp: currentLocation.timestamp
    }
    const imageUrl = await getImageUrl(courseId, createFormData(image));
    const savedImageData = await postImageByLocation(locationData, courseId, imageUrl)

    this.setState({
      totalCourseImages: this.state.totalCourseImages.concat(savedImageData)
    });
  }

  createInitRecording = async () => {
    const {
      onRecordStart,
      onLoadingRecordScreen,
      onLoadingRecordScreenComplete
    } = this.props.screenProps;

    onLoadingRecordScreen();
    const currentLocation = await Location.getCurrentPositionAsync({});
    const currentCoordinates = [ currentLocation.coords.longitude, currentLocation.coords.latitude ]
    const startLocation = {
      type: 'Point',
      coordinates: currentCoordinates,
      address: await getAddress(currentCoordinates),
      timestamp: new Date().toISOString()
    };

    const initialCourseData = await postInitCourse(startLocation);

    this.setState({
      courseId: initialCourseData._id,
      startLocation: initialCourseData.start_location,
      currentLocation: initialCourseData.start_location,
      savedCoordinates: this.state.savedCoordinates.concat(initialCourseData.path),
      totalCoursePath: this.state.savedCoordinates.concat(initialCourseData.path)
    });

    onLoadingRecordScreenComplete();
    onRecordStart();
    this.onStartRecording();
    return initialCourseData;
  }

  onStartRecording = () => {
    const courseRecodingTimer = async () => {
      const {
        recordingStatus
      } = this.props.screenProps;
      if (recordingStatus === 'RECORDING') {
        await this.recordCourse();
        if (this.state.savedCoordinates.length === 10) {
          await this.addCurrentPath();
        }
        setTimeout(courseRecodingTimer, 1000);
      }
    };
    courseRecodingTimer();
  };

  onEndRecording = async () => {
    const { onRecordEnd } = this.props.screenProps;
    await this.addCurrentPath();
    const courseData = await getCourseData(this.state.courseId);

    this.setState({
      totalCourseData: courseData
    });

    onRecordEnd();
  };

  initializeStateData = async (title, description, isPublic) => {
    const { onRecordInitialize } = this.props.screenProps;
    await updateCourseInfo(this.state.courseId, title, description, isPublic)
    onRecordInitialize();
    this.setState({
      courseId: null,
      startLocation: {},
      currentLocation: {},
      savedCoordinates: [],
      courseDistance: 0,
      courseElevation: 0,
      totalCourseImages: [],
      totalCoursePath: [],
      totalCourseData: {}
    });
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

    const { recordingStatus, isLoadingRecord } = this.props.screenProps;

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
            onRecordInitButtonPress={this.initializeStateData}
          />
        );

      default:
        return (
          <RecordStartScreen
            isLoadingRecordScreen={isLoadingRecord}
            onRecordStartButtonPress={this.createInitRecording}
          />
        );
    }
  }

}

export default RecordNavigator;
