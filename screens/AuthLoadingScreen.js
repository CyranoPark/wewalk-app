import React, { useState, useEffect } from 'react';
import { Container, Spinner, Content } from 'native-base';
import * as SecureStore from 'expo-secure-store';
import authConstans from '../constants/auth';

const AuthLoadingScreen = (props) => {

  useEffect(() => {
    getFacebookToken();
  });

  const getFacebookToken = async () => {
    try {
      const fbToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
      props.navigation.navigate(fbToken ? 'Main' : 'Login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Content contentContainerStyle={{
          justifyContent: 'center',
          alignItems:'center',
          flex: 1
        }}
      >
        <Spinner color='green' />
      </Content>
    </Container>
  );
}

export default AuthLoadingScreen;
