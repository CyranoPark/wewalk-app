import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import * as Location from 'expo-location';
import authConstans from '../constants/auth';
import Map from '../components/Map';
import HeaderArea from '../components/HeaderArea';

export default RecordScreen = props => {
  const { socialId, courseId, startLocation, totalCourseData, onRecordEndButtonPress } = props;

  const createFormData = (photo, coords) => {
    const data = new FormData();

    data.append("file", {
      uri: photo.uri,
      name: photo.uri.split('/').pop(),
      type: photo.type,
      coords
    });

    return data;
  };

  const getImageUrl = (imageData, userToken) => (
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

  const saveImageWithLocation = (currentLocation, imageUrl, userToken) => {
    const { latitude, longitude } = currentLocation.coords;
    const { timestamp } = currentLocation;
    return axios.put(
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
  };

  const pickImage = async () => {
    const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
    const currentLocation = await Location.getCurrentPositionAsync();
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
    });

    if (!image.cancelled) {
      const imageData = createFormData(image, currentLocation.coords);
      const imageUrl = await getImageUrl(imageData, userToken);
      await saveImageWithLocation(currentLocation, imageUrl, userToken);
    }
  };

  const generateCamera = async () => {
    const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
    const currentLocation = await Location.getCurrentPositionAsync();
    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!image.cancelled) {
      const imageData = createFormData(image, currentLocation.coords);
      const imageUrl = await getImageUrl(imageData, userToken);
      await saveImageWithLocation(currentLocation, imageUrl, userToken);
    }
  };

  return (
    <>
      <HeaderArea name={'record'} />
      <Container>
        <Map totalCourseData={totalCourseData} startLocation={startLocation} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Content>
          <Button light
            onPress={pickImage}
          >
            <Text>Pick an image from camera roll</Text>
          </Button>
          <Button light
            onPress={generateCamera}
          >
            <Text>take picture</Text>
          </Button>
          <Button light
            onPress={() => onRecordEndButtonPress(courseId)}
          >
            <Text>END walking</Text>
          </Button>
          <Image
            // source={{uri: props.selectedImage}}
            style={{width: 400, height: 400}}
          ></Image>
        </Content>
      </View>
      </Container>
    </>
  );
};

