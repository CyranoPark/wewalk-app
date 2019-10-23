import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';

import { logoutAsync } from '../api';

import colorConstans from '../constants/Colors';

const LogoutHeader = props => {

  const logout = async () => {
    await logoutAsync();
    props.navigation.navigate('Login');
  };

  return (
    <Button
      transparent
      style={{ marginRight: 10 }}
      onPress={logout}
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

export default LogoutHeader;
