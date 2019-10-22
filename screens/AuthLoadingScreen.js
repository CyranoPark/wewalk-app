import { AppLoading } from 'expo';
import React from 'react';
import { Alert } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

import authConstans from '../constants/auth';

export default AuthLoadingScreen = (props) => {
  const { navigation } = props;
  const {
    isLoadingComplete,
    completeAppLoading,
  } = props.screenProps;

  const loadInitialResourcesAsync = async () => {
    if (!isLoadingComplete) {
      await Promise.all([
        Asset.loadAsync([
        ]),
        Font.loadAsync({
          Roboto_medium: require('../assets/fonts/Roboto_medium.ttf')
        }),
        Permissions.askAsync(
          Permissions.CAMERA_ROLL,
          Permissions.LOCATION,
          Permissions.CAMERA
        )
      ]);
      completeAppLoading();
    }
  };

  const handleLoadingError = error => {
    Alert.alert('Failed to load app. Please log on again.');
  };

  const navigateLoginScreen = async () => {
    const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
    const socialId = await SecureStore.getItemAsync(authConstans.SOCIAL_ID);
    if (userToken && socialId) {
      return navigation.navigate('Main');
    }
    return navigation.navigate('Login');
  };

  return (
    <AppLoading
      startAsync={loadInitialResourcesAsync}
      onError={handleLoadingError}
      onFinish={navigateLoginScreen}
    />
  );
};
