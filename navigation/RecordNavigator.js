import React, { useState } from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import RecordStartScreen from '../screens/RecordStartScreen';
import RecordScreen from '../screens/RecordScreen';
import RecordResultScreen from '../screens/RecordResultScreen';

const RecordNavigator = props => {
  console.log(props.screenProps)
  const [ recordId, setRecordId ] = useState(null);
  const {
    onRecordStartButtonPress,
    onRecordEndButtonPress,
    onRecordInitButtonPress,
    recordingStatus,
    socialId,
  } = props.screenProps.props;

  switch (recordingStatus) {
    case 'RECORDING':
      return (
        <RecordScreen
          socialId={socialId}
          recordId={recordId}
          onRecordEndButtonPress={onRecordEndButtonPress}
        />
      );

    case 'AFTER_RECORDING':
      return (
        <RecordResultScreen
          onRecordInitButtonPress={onRecordInitButtonPress}
        />
      );

    default:
      return (
        <RecordStartScreen
          socialId={socialId}
          setRecordId={setRecordId}
          onRecordStartButtonPress={onRecordStartButtonPress}
        />
      );
  }

};

export default RecordNavigator;
