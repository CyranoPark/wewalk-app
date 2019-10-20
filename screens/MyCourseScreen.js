import React, { useEffect } from 'react';
import { Button, Text } from 'native-base';
import HeaderArea from '../components/HeaderArea';
import { View, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import CourseThumbnail from '../components/CourseThumbnail';

const MyCourseScreen = (props) => {
  return (
    <ScrollView
      style={{ flex: 1, paddingTop: 30, paddingBottom: 30, backgroundColor: '#fff' }}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{ width: '100%', alignItems: 'center' }}>
        <CourseThumbnail />
        <CourseThumbnail />
        <CourseThumbnail />
      </View>
      <View style={{ height: 50 }}>
      </View>
    </ScrollView>
  );
}

MyCourseScreen.navigationOptions = {
  marginTop: 24
};

export default MyCourseScreen;
