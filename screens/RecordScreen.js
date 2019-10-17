import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Button, Text, Fab, Icon } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import * as Location from 'expo-location';
import authConstans from '../constants/auth';
import Map from '../components/Map';

import {
  changeElevationFormat,
  changeDistanceFormat,
  changeRecordTimeFormat
} from '../utils/index';

export default RecordScreen = props => {
  const {
    socialId,
    courseId,
    startLocation,
    totalCoursePath,
    totalCourseImages,
    courseDistance,
    courseElevation,
    onPickImage,
    onRecordEndButtonPress
  } = props;
  const [isFabActive, setIsFabActive] = useState(false);

  const pickImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
    });

    if (!image.cancelled) {
      onPickImage(image);
    }
  };

  const generateCamera = async () => {
    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!image.cancelled) {
      onPickImage(image);
    }
  };

  return (
      <Container style={{ flex: 1, justifyContent:'center', height: '100%', position:'relative' }}>
      <Map
        style={styles.mapview}
        startLocation={startLocation}
        totalCoursePath={totalCoursePath}
        totalCourseImages={totalCourseImages}
      />
      <View style={styles.container}>
        <View style={styles.topBoard}>
          <View style={styles.column}>
            <Text style={styles.titleText}>Total Elevation</Text>
            <Text style={styles.dataText}>
              {changeElevationFormat(courseElevation)}
              <Text style={styles.text}>m</Text>
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.titleText}>Total Distance</Text>
            <Text style={styles.dataText}>
              {changeDistanceFormat(courseDistance)}
              <Text style={styles.text}>Km</Text>
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.titleText}>Total Time</Text>
            <Text style={styles.dataText}>
              {changeRecordTimeFormat(startLocation.timestamp)}
              <Text style={styles.text}>min</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.fab}>
        <Fab
          active={isFabActive}
          direction="up"
          position="bottomRight"
          onPress={() => setIsFabActive(!isFabActive)}
        >
          <Icon name="images" />
          <Button onPress={generateCamera} style={{ backgroundColor: '#34A34F' }}>
            <Icon name="camera" />
          </Button>
          <Button onPress={pickImage} style={{ backgroundColor: '#34A34F' }}>
            <Icon name="image" />
          </Button>
        </Fab>
      </View>
      <View style={styles.exitButtonWrap}>
        <Button
          iconLeft
          danger
          style={styles.exitButton}
          onPress={onRecordEndButtonPress}
        >
          <Icon name='exit' />
          <Text style={{ color: 'white'}}>End Record</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    top: 30,
  },
  topBoard: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 8
  },
  exitButtonWrap: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  exitButton: {
    width: '90%',
    justifyContent: 'center'
  },
  fab: {
    bottom: 60
  },
  mapview: {
    width: '100%',
    height: '100%'
  },
  column: {
    justifyContent: 'center',
    width: '30%',
  },
  content: {
    flexDirection: 'column'
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dataText: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  titleText: {
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
