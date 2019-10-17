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

export default AuthLoadingScreen = (props) => {
  const { navigation } = props;
  const {
    isLoadingComplete,
    socialId,
    completeAppLoading,
    completeLogin
  } = props.screenProps.props;

  const loadInitialResourcesAsync = async () => {
    if (!isLoadingComplete) {
      await Promise.all([
        Asset.loadAsync([
          require('../assets/images/robot-dev.png'),
          require('../assets/images/robot-prod.png'),
        ]),
        Font.loadAsync({
          ...Ionicons.font,
          Roboto_medium: require('../assets/fonts/Roboto_medium.ttf')
        }),
        Permissions.askAsync(
          Permissions.CAMERA_ROLL,
          Permissions.LOCATION,
          Permissions.CAMERA
        )
      ]).then(() => {
        completeAppLoading();
      });
    }
  };

  const navigateLoginScreen = async () => {
    const userToken = await SecureStore.getItemAsync(authConstans.USERTOKEN);
    if (userToken && socialId) {
      return navigation.navigate('Main');
    }
    return navigation.navigate('Main');
    // return navigation.navigate('Login', {
    //   completeLogin
    // });
  };

  return (
    <AppLoading
      startAsync={loadInitialResourcesAsync}
      onError={handleLoadingError}
      onFinish={navigateLoginScreen}
    />
  );
};

const mapStateToProps = state => {
  const { isLoadingComplete, socialId } = state;

  return {
    isLoadingComplete,
    socialId
  };
};

const mapDispatchToProps = dispatch => ({
  completeAppLoading: () => dispatch({ type: 'COMPLETE_LOADING' }),
  completeLogin: (userId) => dispatch({ type: 'COMPLETE_LOGIN', id: userId })
});

// export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
