import React from 'react';
import { Alert, StyleSheet } from 'react-native'
import { Container, Icon, Button, Text, View } from 'native-base';
import colorConstans from '../constants/Colors';
import { loginWithFacebook } from '../api';

export default LoginScreen = props => {

  const onLoginButtonPress = async () => {
    try {
      const user = await loginWithFacebook();

      Alert.alert('Logged in!', `Hi ${user.name}!`);
      props.navigation.navigate('Main');
    } catch ({ message }) {
      Alert.Buttonalert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <Container style={styles.container}>
      <View>
        <Text
          style={styles.titleText}>
          WE WALK
        </Text>
        <Button
          primary
          onPress={onLoginButtonPress}
          style={styles.loginButton}
        >
          <Icon name="logo-facebook" />
          <Text>Facebook Login</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: colorConstans.mainColor,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50
  },
  loginButton: {
    backgroundColor: colorConstans.facebookDefaultColor,
    borderRadius: 5
  }
});
