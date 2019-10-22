import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { Icon, Button, Text } from 'native-base';
import colorConstans from '../constants/Colors';
import Course from '../components/Course';
import {
  changeDateFormat
} from '../utils';

export default CourseDetailScreen = props => {
  const { navigation } = props;
  const course = navigation.getParam('courseData');

  return (
    <SafeAreaView contentContainerStyle={styles.container}>
      <ScrollView>
        <View style={{ alignItems:'center', marginBottom: 10 }}>
          <Text
            style={styles.titleText}>
            {course.title}
          </Text>
          <Text
            style={styles.subTitleText}>
            {course.description}
          </Text>
        </View>
        <View style={{ flexDirection:'column', alignItems: 'flex-start', padding: 10 }}>
          <Text style={styles.dateText}>
            date :
            {changeDateFormat(course.createdAt)}
          </Text>
          <Text style={styles.byText}>
            by :
            {course.created_by.name}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Course totalCourseData={course} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  titleText: {
    color: colorConstans.mainColor,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  dateText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  byText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
