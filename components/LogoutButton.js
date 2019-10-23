import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';

import colorConstans from '../constants/Colors';

const LogoutButton = props => {
  return (
    <Button
      transparent
      style={{ marginRight: 10 }}
      onPress={props.onLogoutButtonClick}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: colorConstans.headerTextColor
        }}
      >
        Log out
      </Text>
    </Button>
  );
};

export default LogoutButton;
