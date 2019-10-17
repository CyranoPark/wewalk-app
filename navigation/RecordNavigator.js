import React, { Component } from 'react';
import axios from 'axios';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';

import RecordStartScreen from '../screens/RecordStartScreen';
import RecordScreen from '../screens/RecordScreen';
import RecordResultScreen from '../screens/RecordResultScreen';

import { calculateElevation, calculateDistance } from '../utils';
import authConstans from '../constants/auth';
import mockData from '../constants/locationData';

class RecordNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseId: null,
      startLocation: {},
      courseCoordinates: [],
      courseDistance: 0,
      courseElevation: 0,
      totalCourseImages: [],
      totalCoursePath: [],
      totalCourseData: {},
      recordTimers: [],
      counter: 0
    }
  }

  recordCourse = async () => {
    await Location.startLocationUpdatesAsync('record');
    const { courseCoordinates } = this.state;
    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: 5
    });
    const { latitude, longitude } = currentLocation.coords;
    const { timestamp }  = currentLocation
    const currentCoordinate = {
      latitude,
      longitude,
      timestamp
    };

    if (!courseCoordinates.length) {
      return this.setState({
        courseCoordinates: this.state.courseCoordinates.concat(currentCoordinate)
      });
    }
    const prevLocation = courseCoordinates[courseCoordinates.length - 1];
    const currentElevation = await calculateElevation(prevLocation, currentCoordinate);
    const currentDistance = await calculateDistance(prevLocation, currentCoordinate);

    //mockData
    // const currentCoordinate = {
    //   latitude: mockData.latitude + ( this.state.counter * 0.0001 ),
    //   longitude: mockData.longitude + ( this.state.counter * 0.0001 ),
    //   timestamp: new Date() + this.state.counter,
    // };

    // const currentElevation = this.state.counter;
    // const currentDistance = this.state.counter + 100;
    //end

    this.setState({
      courseCoordinates: this.state.courseCoordinates.concat(currentCoordinate),
      courseElevation: this.state.courseElevation + currentElevation,
      courseDistance: this.state.courseDistance + currentDistance,
      counter: this.state.counter + 1
    });
  };

  addCurrentPath = async () => {
    const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
    const { socialId } = this.props.screenProps.props
    // const socialId = 2506019922818198
    // const userToken = 'dfdfadf'
    const { courseId } = this.state;
    const path = this.state.courseCoordinates;
    const distance = this.state.courseDistance;
    const elevation = this.state.courseElevation;

    const coursePath = await axios.post(`${process.env.API_URL}/course/${courseId}/path`,
    {
      path,
      distance,
      elevation
    },
    {
      'content-type': 'application/json',
      'userToken': 'Bearer ' + userToken,
      socialId
    }).then(res => res.data);

    this.setState({
      totalCoursePath: coursePath,
      courseCoordinates: [],
    });
  };

  addImageData = async (image) => {
    const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
    const { socialId } = this.props.screenProps.props;
    // const socialId = 2506019922818198
    // const userToken = 'dfdfadf'
    const currentLocation = {
      latitude: mockData.latitude + ( this.state.counter * 0.0001 ),
      longitude: mockData.longitude + ( this.state.counter * 0.0001 ),
      timestamp: new Date() + this.state.counter,
    };
    const { latitude, longitude } = currentLocation;
    const { timestamp } = currentLocation;
    const { courseId } = this.state;
    const imageData = createFormData(image);
    const imageUrl = await getImageUrl(imageData);
    const savedImageData = await axios.put(
      `${process.env.API_URL}/course/${courseId}/image`,
      {
        location: {
          latitude,
          longitude,
          timestamp
        },
        imageUrl
      },
      {
        headers: {
          'content-type': 'application/json',
          'userToken': 'Bearer ' + userToken,
          socialId
        }
      },
    ).then(res => res.data)
    .catch(err => alert('failure save image'));

    this.setState({
      totalCourseImages: this.state.totalCourseImages.concat(savedImageData)
    })


    function createFormData(photo) {
      const data = new FormData();

      data.append("file", {
        uri: photo.uri,
        name: photo.uri.split('/').pop(),
        type: photo.type
      });

      return data;
    };

    function getImageUrl(imageData) {
      return (
        axios.post(
          `${process.env.API_URL}/course/${courseId}/image`,
          imageData,
          {
            headers: {
              'Content-Type': `multipart/form-data`,
              'userToken': 'Bearer ' + userToken,
              socialId
            }
          },
        ).then(({ data }) => data.imageUrl)
      );
    }
  }

  getCourseData = async () => {
    const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
    const { socialId } = this.props.screenProps.props
    // const socialId = 2506019922818198
    // const userToken = 'dfdfadf'
    const { courseId } = this.state;
    return await axios.get(`${process.env.API_URL}/course/${courseId}`,
    {
      'content-type': 'application/json',
      'userToken': 'Bearer ' + userToken,
      socialId
    }).then(res => res.data);
  };

  onStartRecording = (courseId, startLocation) => {
    const { onRecordStartButtonPress } = this.props.screenProps.props;
    const courseRecodingTimer = setInterval(this.recordCourse, 1000);
    const getCourseTimer = setInterval(this.addCurrentPath, 6000);
    //mockdata
    // const startLocation = {
    //   latitude: mockData.latitude,
    //   longitude: mockData.longitude,
    //   timestamp: new Date()
    // };
    //end
    this.setState({
      courseId,
      startLocation,
      recordTimers: [courseRecodingTimer, getCourseTimer]
    });

    onRecordStartButtonPress();
  };

  onEndRecording = async () => {
    const { onRecordEndButtonPress } = this.props.screenProps.props;

    await this.addCurrentPath();
    const courseData = await this.getCourseData();
    clearInterval(this.state.recordTimers[0]);
    clearInterval(this.state.recordTimers[1]);

    onRecordEndButtonPress();

    this.setState({
      courseId: null,
      startLocation: {},
      courseCoordinates: [],
      courseDistance: 0,
      courseElevation: 0,
      totalCourseImages: [],
      totalCoursePath: [],
      totalCourseData: courseData,
      recordTimers: [],
      counter: 0
    });
  };

  render() {
    const {
      courseId,
      startLocation,
      totalCourseImages,
      courseDistance,
      courseElevation,
      totalCoursePath,
      totalCourseData
    } = this.state;

    const {
      onRecordStartButtonPress,
      onRecordEndButtonPress,
      onRecordInitButtonPress,
      recordingStatus,
      socialId,
    } = this.props.screenProps.props;

    switch (recordingStatus) {
      case 'RECORDING':
        return (
          <>
            <RecordScreen
              socialId={socialId}
              courseId={courseId}
              startLocation={startLocation}
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
            totalCourseData={totalCourseData}
            onRecordInitButtonPress={onRecordInitButtonPress}
          />
        );

      default:
        return (
          <RecordStartScreen
            socialId={socialId}
            courseId={courseId}
            onRecordStartButtonPress={this.onStartRecording}
          />
        );
    }
  }

}

export default RecordNavigator;
