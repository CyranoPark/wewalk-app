import React from 'react';
import { Provider, connect } from 'react-redux';
import { Container, Icon, Button, Text, Content } from 'native-base';
import * as SecureStore from 'expo-secure-store';
import HeaderArea from '../components/HeaderArea';
import authConstans from '../constants/auth';
import colorConstans from '../constants/Colors';
import axios from 'axios';

const ProfileScreen = props => {

  logOutAsync = async () => {
      const userToken = await SecureStore.getItemAsync('USERTOKEN');
      await axios.post(
        `${process.env.API_URL}/logout`,
        {
          socialId : props.socialId,
          userToken
        },
        {
          headers: {
            'content-type': 'application/json'
          }
        },
      ).then(async () => {
        await SecureStore.deleteItemAsync(authConstans.FBTOKEN);
        await SecureStore.deleteItemAsync(authConstans.USERTOKEN);
        props.dispatch({ type: 'LOGOUT' });
        props.navigation.navigate('Login');
      });
  };

  return (
    <Container>
      <HeaderArea name='Profile' />
      <Content
        contentContainerStyle={{
          alignItems:'center',
          flex: 1
        }}
      >
        <Button
          primary
          onPress={logOutAsync}
          style={{backgroundColor: colorConstans.facebookDefaultColor}}
        >
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

export default connect(state => state)(ProfileScreen);
