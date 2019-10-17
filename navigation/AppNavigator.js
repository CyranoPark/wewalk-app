import React from 'react';
import { connect } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const AppNavigator = createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Login: LoginScreen,
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  })
);

const AppContainer = (props) => {
  return (
    <AppNavigator
      screenProps={
        {
          props
        }
      }
    />
);
}

const mapStateToProps = state => {
  const { isLoadingComplete, socialId, recordingStatus } = state;

  return {
    isLoadingComplete,
    socialId,
    recordingStatus
  };
}

const mapDispatchToProps = dispatch => ({
  completeAppLoading: () => dispatch({ type: 'COMPLETE_LOADING' }),
  afterLoginButtonPress: (userId) => dispatch({ type: 'COMPLETE_LOGIN', id: userId }),
  onLogoutButtonPress: () => dispatch({ type: 'LOGOUT' }),
  onRecordStartButtonPress: () => dispatch({ type: 'START_RECORDING' }),
  onRecordEndButtonPress: () => dispatch({ type: 'END_RECORDING' }),
  onRecordInitButtonPress: () => dispatch({ type: 'INIT_RECORDING' })
});

export default ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
