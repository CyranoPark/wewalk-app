import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import Course from '../components/Course';
import CourseRegistration from '../components/CourseRegistration';

import colorConstans from '../constants/Colors';

const RecordResultScreen = props => {
  const {
    onRecordSaveButtonPress,
    totalCourseData
  } = props;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{
        alignItems: 'center',
      }}>
        <Text
          style={styles.titleText}>
          Record Result
        </Text>
        <View style={{ height: 300 }} >
          <CourseRegistration
            onRecordSaveButtonPress={onRecordSaveButtonPress}
          />
        </View>
        <Course
          totalCourseData={totalCourseData}
          style={{ marginBottom: 50 }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  titleText: {
    color: colorConstans.mainColor,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50
  }
});

export default RecordResultScreen;
