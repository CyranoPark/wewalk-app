import React from 'react';
import axios from 'axios';
import * as Facebook from 'expo-facebook';
import { Alert } from 'react-native'
import { Container, Icon, Button, Text, Content, View } from 'native-base';
import * as SecureStore from 'expo-secure-store';
import authConstans from '../constants/auth';
import colorConstans from '../constants/Colors';
import HeaderArea from '../components/HeaderArea';


export default LoginScreen = props => {
  const { navigation } = props;
  const { afterLoginButtonPress } = props.screenProps.props;

  const loginWithFacebook = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(process.env.FB_API_KEY, {
        permissions: ['public_profile'],
      });

      if (type === 'success') {
        const user = await axios.get(
          authConstans.FB_GRAPH_URL(token)
        ).then(data => data.data);

        const userToken = await axios.post(
          `${process.env.API_URL}/login/facebook`,
          {
            socialService: authConstans.SOCIAL_SERVICE[0],
            socialId: user.id,
            userName: user.name,
            profileImage: user.picture.data.url
          },
          {
            headers: {
              'content-type': 'application/json'
            }
          },
        ).then(data => data.headers.usertoken);

        await SecureStore.setItemAsync(authConstans.FBTOKEN, token);
        await SecureStore.setItemAsync(authConstans.USERTOKEN, userToken);
        afterLoginButtonPress(user.id);

        Alert.alert('Logged in!', `Hi ${user.name}!`);
        navigation.navigate('Main');
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <Container>
      <HeaderArea name={'Login'}/>
      <Content
        contentContainerStyle={{
          alignItems:'center'
        }}
      >
        <View>
          <Text
            style={{
              color: colorConstans.mainColor,
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 50
            }}>
            WE WALK
          </Text>
          <Button
            primary
            onPress={loginWithFacebook}
            style={{backgroundColor: colorConstans.facebookDefaultColor}}
          >
            <Icon name="logo-facebook" />
            <Text>Facebook Login</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};
