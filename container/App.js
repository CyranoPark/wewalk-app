import React from 'react';
import { connect } from 'react-redux';

import AppNavigator from '../navigation/AppNavigator';

import {
  COMPLETE_LOADING,
  LOADING_RECORD_SCREEN,
  COMPLETE_LOADING_RECORD_SCREEN,
  START_RECORDING,
  END_RECORDING,
  INIT_RECORDING
} from '../constants/actionType';

const mapStateToProps = state => {
  const { isLoadingComplete, recordingStatus, isLoadingRecord } = state;

  return {
    isLoadingComplete,
    recordingStatus,
    isLoadingRecord
  };
};

const mapDispatchToProps = dispatch => ({
  completeAppLoading: () => dispatch({ type: COMPLETE_LOADING }),
  onLoadingRecordScreen: () => dispatch({ type: LOADING_RECORD_SCREEN }),
  onLoadingRecordScreenComplete: () => dispatch({ type: COMPLETE_LOADING_RECORD_SCREEN }),
  onRecordStart: () => dispatch({ type: START_RECORDING }),
  onRecordEnd: () => dispatch({ type: END_RECORDING }),
  onRecordInitialize: () => dispatch({ type: INIT_RECORDING })
});

const AppContainer = props => {
  return <AppNavigator screenProps={props}/>;
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
