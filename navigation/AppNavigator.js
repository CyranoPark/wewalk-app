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

const AppContainer = props => {
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
  const { isLoadingComplete, recordingStatus, isLoadingRecord } = state;

  return {
    isLoadingComplete,
    recordingStatus,
    isLoadingRecord
  };
}

const mapDispatchToProps = dispatch => ({
  completeAppLoading: () => dispatch({ type: 'COMPLETE_LOADING' }),
  onLoadingRecordScreen: () => dispatch({ type: 'LOADING_RECORD_SCREEN' }),
  onLoadingRecordScreenComplete: () => dispatch({ type: 'COMPLETE_LOADING_RECORD_SCREEN' }),
  onRecordStart: () => dispatch({ type: 'START_RECORDING' }),
  onRecordEnd: () => dispatch({ type: 'END_RECORDING' }),
  onRecordInitialize: () => dispatch({ type: 'INIT_RECORDING' })
});

export default ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
