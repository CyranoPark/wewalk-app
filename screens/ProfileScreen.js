import React from 'react';
import { Container, Icon, Button, Text, Content } from 'native-base';
import * as SecureStore from 'expo-secure-store';
import HeaderArea from '../components/HeaderArea';
import authConstans from '../constants/auth';

export default ProfileScreen = (props) => {

  logOutAsync = async () => {
    await SecureStore.deleteItemAsync(authConstans.FBTOKEN);
    await SecureStore.deleteItemAsync(authConstans.USERTOKEN);
    props.navigation.navigate('Login');
  };

  return (
    <Container>
      <HeaderArea name='Profile' />
      <Content
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems:'center',
          flex: 1
        }}
      >
        <Button primary onPress={logOutAsync}>
          <Icon name='ios-log-out' />
          <Text>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
}

ProfileScreen.navigationOptions = {
  header: null,
};
