import React from 'react';
import { StyleSheet } from 'react-native'
import { Container, Button, Text, Content, View } from 'native-base';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import authConstans from '../constants/auth';
import colorConstans from '../constants/Colors';
import mockData from '../constants/locationData'

export default RecordStartScreen = props => {
  const { onRecordStartButtonPress } = props;
/*
	"socialId" : "2506019922818198",
	"startLocation" : {
		"latitude": 37.8025259,
		"longitude": -122.4351431
	}
*/

  const createInitialRecord = async () => {
    const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
    const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);
    const currentCoords = await Location.getCurrentPositionAsync();
    const startLocation = {
      type: 'Point',
      coordinates: [currentCoords.coords.latitude, currentCoords.coords.longitude],
      timestamp: new Date().toISOString()
    };
    await axios.post(
      `${process.env.API_URL}/course/new`,
      {
        startLocation
      },
      {
        headers: {
          'content-type': 'application/json',
          userToken: 'Bearer ' + userToken,
          socialId
        }
      },
    ).then(({ data }) => {
      onRecordStartButtonPress(data._id, data.start_location);
    });
  };

  return (
    <Container style={styles.container}>
      <View>
        <Text
          style={{
            color: colorConstans.mainColor,
            fontSize: 40,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 50
          }}>
          START
        </Text>
        <Button
          primary
          onPress={createInitialRecord}
          style={{backgroundColor: colorConstans.mainColor}}
        >
          <Text>start Record</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
