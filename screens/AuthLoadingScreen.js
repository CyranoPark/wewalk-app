import { AppLoading } from 'expo';
import React from 'react';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

import authConstans from '../constants/auth';

const handleLoadingError = error => {
  console.error(error);
};

const AuthLoadingScreen = (props) => {
  const { navigation } = props;

  const loadInitialResourcesAsync = async () => {
    if (!props.isLoadingComplete) {
      await Promise.all([
        Asset.loadAsync([
          require('../assets/images/robot-dev.png'),
          require('../assets/images/robot-prod.png'),
        ]),
        Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        }),
        Permissions.askAsync(
          Permissions.CAMERA_ROLL,
          Permissions.LOCATION,
          Permissions.CAMERA
        )
      ]).then(() => {
        props.dispatch({ type: 'COMPLETE_LOADING' });
      });
    }
  };

  const navigateMainScreen = async () => {
    try {
      const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);

      if (userToken && props.isAuthorize) {
        return navigation.navigate('Main');
      }
      return navigation.navigate('Login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AppLoading
      startAsync={loadInitialResourcesAsync}
      onError={handleLoadingError}
      onFinish={navigateMainScreen}
    />
  );
}

export default connect(state => state, null)(AuthLoadingScreen);
