import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Container, Icon, Button, Text, View } from 'native-base';



import colorConstans from '../constants/Colors';

const LoginScreen = props => {
  const { onLoginButtonPress } = props;

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

export default LoginScreen;
