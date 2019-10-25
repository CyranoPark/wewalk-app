import React, { Component } from 'react';
import { Alert } from 'react-native';

import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { captureRef } from 'react-native-view-shot';

import RecordStartScreen from '../screens/RecordStartScreen';
import RecordScreen from '../screens/RecordScreen';
import RecordResultScreen from '../screens/RecordResultScreen';

import {
  updateCurrentPath,
  updateImageByLocation,
  updateThumbnailImage,
  getImageUrl,
  getCourseData,
  postInitCourse,
  updateCourseInfo
} from '../api';
import {
  calculateElevation,
  calculateDistance,
  createFormData,
  getAddress
} from '../utils';

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
    };
  }

  recordCourse = async () => {
    try {
      const { counter, totalCoursePath } = this.state;
      const currentLocationData = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocationData.coords;
      const currentLocation = {
        coordinates: [ longitude, latitude ],
        timestamp: new Date().toISOString()
      };

      const prevLocation = totalCoursePath[totalCoursePath.length - 1];
      const currentElevation = await calculateElevation(prevLocation, currentLocation);
      const currentDistance = calculateDistance(prevLocation, currentLocation);
      this.setState({
        savedCoordinates: this.state.savedCoordinates.concat(currentLocation),
        courseElevation: this.state.courseElevation + currentElevation,
        courseDistance: this.state.courseDistance + currentDistance,
        currentLocation,
        totalCoursePath: totalCoursePath.concat(currentLocation),
        counter : counter + 0.00001
      });
    } catch (error) {
      Alert.alert(
        'Error!',
        'An error occurred while recording the course. Are you sure you want to exit?',
        [
          { text: 'Cancel' },
          { text: 'ReStart', onPress: () => {
            this.props.screenProps.onRecordInitialize();
            this.createInitRecording();
          }},
          { text: 'OK', onPress: () => this.initializeStateData() }
        ],
        { cancelable: false }
      );
    }
  };

  addCurrentPath = async () => {
    try {
      const { courseId, savedCoordinates, courseDistance, courseElevation } = this.state;
      await updateCurrentPath(courseId, savedCoordinates, courseDistance, courseElevation);
      this.setState({
        savedCoordinates: []
      });
    } catch (error) {
      Alert.alert(
        'Error!',
        'An error occurred while recording the course. Are you sure you want to exit?',
        [
          { text: 'Cancel' },
          { text: 'ReStart', onPress: () => {
            this.props.screenProps.onRecordInitialize();
            this.createInitRecording();
          }},
          { text: 'OK', onPress: () => this.initializeStateData() }
        ],
        { cancelable: false }
      );
    }
  };

  generateLibrary = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.1,
        aspect: [4, 3],
      });
      if (!image.cancelled) {
        this.addImageData(image);
      }
    } catch (err) {
      alert(`Cannot pick Image : ${err.message}`);
    }
  };

  generateCamera = async () => {
    try {
      const image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 0.1,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!image.cancelled) {
        this.addImageData(image);
      }
    } catch (err) {
      alert(`Cannot generate Camera : ${err.message}`);
    }
  };

  addImageData = async image => {
    try {
      const { currentLocation } = this.state;
      const { courseId } = this.state;
      const locationData = {
        type: 'Point',
        coordinates: currentLocation.coordinates,
        timestamp: currentLocation.timestamp
      };

      const imageUrl = await getImageUrl(courseId, createFormData(image.uri));
      const savedImageData = await updateImageByLocation(locationData, courseId, imageUrl);

      this.setState({
        totalCourseImages: this.state.totalCourseImages.concat(savedImageData)
      });
    } catch (error) {
      Alert.alert(
        'Error!',
        'Failed Image upload',
        [
          { text: 'Cancel' },
          { text: 'OK', onPress: () => this.initializeStateData() }
        ],
        { cancelable: false }
      );
    }
  };

  saveCourseInfo = async (title, description, isPublic) => {
    try {
      await updateCourseInfo(this.state.courseId, title, description, isPublic);
      this.initializeStateData();
    } catch (error) {
      alert('course update Failed');
      this.props.navigation.navigate('MyCourse');
    }
  };

  createInitRecording = async () => {
    const {
      onRecordStart,
      onLoadingRecordScreen,
      onLoadingRecordScreenComplete
    } = this.props.screenProps;

    onLoadingRecordScreen();

    try {
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
    } catch (error) {
      alert('cannot start course');
      this.initializeStateData();
    }
  }

  onStartRecording = () => {
    const courseRecodingTimer = async () => {
      const { recordingStatus } = this.props.screenProps;
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

  onEndRecording = async mapRef => {
    try {
      const snapShot = await captureRef(mapRef, {
        format: 'jpg',
        quality: 0.8
      });

      const { onRecordEnd } = this.props.screenProps;
      const { courseId } = this.state;
      const imageUrl = await getImageUrl(courseId, createFormData(snapShot));

      await updateThumbnailImage(courseId, imageUrl);
      await this.addCurrentPath();

      const courseData = await getCourseData(courseId);

      this.setState({
        totalCourseData: courseData
      });
      onRecordEnd();
    } catch (error) {
      alert('cannot end course');
      this.initializeStateData();
    }
  };

  initializeStateData = () => {
    const { onRecordInitialize } = this.props.screenProps;

    this.props.navigation.navigate('MyCourse');
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
    const { recordingStatus, isLoadingRecord } = this.props.screenProps;
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
            generateLibrary={this.generateLibrary}
            generateCamera={this.generateCamera}
            onRecordEndButtonPress={this.onEndRecording}
          />
        </>
      );

    case 'AFTER_RECORDING':
      return (
        <RecordResultScreen
          totalCourseData={totalCourseData}
          onRecordSaveButtonPress={this.saveCourseInfo}
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
