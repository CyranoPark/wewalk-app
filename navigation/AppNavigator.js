import React from 'react';
import { Alert } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import { loginWithFacebook } from '../api';

const LoginContainer = props => {
  const facebookLogin = async () => {
    try {
      const user = await loginWithFacebook();
      Alert.alert('Logged in!', `Hi ${user.name}!`);
      props.navigation.navigate('Main');
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  };
  return (
    <LoginScreen onLoginButtonPress={facebookLogin} />
  );
};

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Login: LoginContainer,
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(AppNavigator);
