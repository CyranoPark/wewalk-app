import React, { Component } from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import axios from 'axios';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import HeaderArea from '../components/HeaderArea';

export default class LinksScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      errorMessage: null,
      image: null
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    const permission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.LOCATION,
      Permissions.CAMERA
    );
    console.log(permission)

    if (permission.status !== 'granted') {
      throw new Error('permission not granted');
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _generateCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    console.log(this.state.location)
    let { image } = this.state;
    return (
      <>
        <HeaderArea />
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
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
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
              onPress={this._pickImage}
            >
              <Text>Pick an image from camera roll</Text>
            </Button>
            <Button light
              onPress={this._generateCamera}
            >
              <Text>take picture</Text>
            </Button>
            </Content>
          </Container>
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
      </>
    );
  }
}

LinksScreen.navigationOptions = {
  title: 'Links',
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
