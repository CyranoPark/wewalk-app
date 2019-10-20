import React from 'react';
import { connect } from 'react-redux';
import { Container, Icon, Button, Text, Content } from 'native-base';
import * as SecureStore from 'expo-secure-store';
import authConstans from '../constants/auth';
import colorConstans from '../constants/Colors';
import axios from 'axios';

export default ProfileScreen = props => {

  const logOutAsync = async () => {
    const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
    const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);
    await axios.post(
      `${process.env.API_URL}/logout`,
      {},
      {
        headers: {
          'content-type': 'application/json',
          userToken: 'Bearer ' + userToken,
          socialId,
        }
      },
    ).then(async () => {
      await SecureStore.deleteItemAsync(authConstans.FBTOKEN);
      await SecureStore.deleteItemAsync(authConstans.USERTOKEN);
      props.navigation.navigate('Login');
    });
  };

  return (
    <>
      <Content
        contentContainerStyle={{
          alignItems:'center',
          flex: 1
        }}
      >
        <Button
          primary
          onPress={logOutAsync}
          style={{backgroundColor: colorConstans.facebookDefaultColor}}
        >
          <Icon name='ios-log-out' />
          <Text>Logout</Text>
        </Button>
      </Content>
    </>
  );
};
