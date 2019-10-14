import React, { useEffect } from 'react';
import { Button, Text, View } from 'native-base';
import HeaderArea from '../components/HeaderArea';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

const HomeScreen = (props) => {
  useEffect(() => {
    console.log(props.socialId)
  });

  return (
    <>
      <HeaderArea name={'Feed'}/>
      <View>
        <Text>Feed</Text>
        <Button />
      </View>
    </>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

export default connect(state => state)(HomeScreen);
