import React from 'react';
import { View, Image} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Button, Text } from 'native-base';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as Location from 'expo-location';
import HeaderArea from '../components/HeaderArea';

const RecordScreen = (props) => {

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      props.dispatch({ type: 'SELECT_IMAGE', imageUrl: result.uri });
    }
  };

  const generateCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      props.dispatch({ type: 'SELECT_IMAGE', imageUrl: result.uri });
    }
  };

  return (
    <>
      <HeaderArea name={'Record'}/>
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
          <Image
            source={{uri: props.selectedImage}}
            style={{width: 400, height: 400}}
          ></Image>
          </Content>
        </Container>
      </View>
    </>
  );
};

RecordScreen.navigationOptions = {
  title: 'Record',
  header: null
};

export default connect(state => state)(RecordScreen);

