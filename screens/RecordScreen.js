import React from 'react';
import { View, Image} from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import authConstans from '../constants/auth';
import axios from 'axios';
import * as Location from 'expo-location';

export default RecordScreen = props => {
  const { socialId, recordId, onRecordEndButtonPress } = props;

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
      `${process.env.API_URL}/course/${recordId}/image`,
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

  const saveImageWithLocation = (coords, imageUrl, userToken) => (
    axios.put(
      `${process.env.API_URL}/course/${recordId}/image`,
      {
        location: [coords.latitude, coords.longitude],
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
  );

  const pickImage = async () => {
    const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
    const currentLocation = await Location.getCurrentPositionAsync();
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
    });

    const imageData = createFormData(image, currentLocation.coords);

    if (!image.cancelled) {
      const imageUrl = await getImageUrl(imageData, userToken);
      console.log(imageUrl);
      const save = await saveImageWithLocation(currentLocation.coords, imageUrl, userToken);
      console.log(save);
      // props.dispatch({ type: 'SELECT_IMAGE', imageUrl: result.uri });
    }
  };

  const generateCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      // props.dispatch({ type: 'SELECT_IMAGE', imageUrl: result.uri });
    }
  };

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={ { width:"100%", height:"50%" } }
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      <Polyline
        coordinates={[
          { latitude: 37.8025259, longitude: -122.4351431 },
          { latitude: 37.7896386, longitude: -122.421646 },
          { latitude: 37.7665248, longitude: -122.4161628 },
          { latitude: 37.7734153, longitude: -122.4577787 },
          { latitude: 37.7948605, longitude: -122.4596065 },
          { latitude: 37.8025259, longitude: -122.4351431 }
        ]}
        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
        strokeColors={[
          '#7F0000',
          '#000000', // no color, creates a "long" gradient between the previous and next coordinate
          '#B24112',
          '#E5845C',
          '#238C23',
          '#7F0000'
        ]}
        strokeWidth={6}
      />
    </MapView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Container>
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
            onPress={onRecordEndButtonPress}
          >
            <Text>END walking</Text>
          </Button>
          <Image
            // source={{uri: props.selectedImage}}
            style={{width: 400, height: 400}}
          ></Image>
          </Content>
        </Container>
      </View>
    </>
  );
};

