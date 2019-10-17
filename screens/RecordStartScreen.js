import React from 'react';
import { Container, Icon, Button, Text, Content, View } from 'native-base';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import authConstans from '../constants/auth';
import colorConstans from '../constants/Colors';
import HeaderArea from '../components/HeaderArea';
import mockData from '../constants/locationData'
export default RecordStartScreen = props => {
  const { socialId, courseId, onRecordStartButtonPress } = props;
/*
	"socialId" : "2506019922818198",
	"startLocation" : {
		"latitude": 37.8025259,
		"longitude": -122.4351431
	}
*/

  const createInitialRecord = async () => {
    const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
      // const userToken = 'dfdfadf'
      // const socialId = 2506019922818198
    const currentLocation = await Location.getCurrentPositionAsync();
    const startLocation = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      timestamp: currentLocation.timestamp
    };

    //mockdata
    // const startLocation = {
    //   latitude: mockData.latitude,
    //   longitude: mockData.longitude,
    //   timestamp: new Date()
    // };
    //end
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
    <Container>
      <HeaderArea name={'record'} />
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
