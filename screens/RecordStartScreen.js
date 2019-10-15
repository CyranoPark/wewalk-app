import React from 'react';
import { Container, Icon, Button, Text, Content, View } from 'native-base';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import authConstans from '../constants/auth';
import colorConstans from '../constants/Colors';

export default RecordStartScreen = props => {
  console.log(props)
  const { socialId, setRecordId, onRecordStartButtonPress } = props;
/*
	"socialId" : "2506019922818198",
	"startLocation" : {
		"latitude": 37.8025259,
		"longitude": -122.4351431
	}
*/

  const createInitialRecord = async () => {
    const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
    const currentLocation = await Location.getCurrentPositionAsync();
    const startLocation = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      timestamps: currentLocation.timestamp
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
      setRecordId(data._id);
      onRecordStartButtonPress();
    });
  };

  return (
    <Container>
      <Content
        contentContainerStyle={{
          alignItems:'center'
        }}
      >
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
            style={{backgroundColor: colorConstans.facebookDefaultColor}}
          >
            <Text>start Record</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};
