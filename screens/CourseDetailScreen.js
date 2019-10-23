import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, Modal, Button } from 'react-native';

import Course from '../components/Course';
import CourseRegistration from '../components/CourseRegistration';
import { changeDateFormat } from '../utils';

import colorConstans from '../constants/Colors';

const CourseDetailScreen = props => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const { navigation } = props;
  const course = navigation.getParam('courseData');
  const isMyCourse = navigation.getParam('isMyCourse');
  const updateCourse = navigation.getParam('updateCourse');

  const updateCourseData = async (title, description, isPublic) => {
    await updateCourse(course._id, title, description, isPublic);
    setModalVisible(!modalVisible);
    alert('update complete');
    navigation.goBack();
  };

  return (
    <SafeAreaView contentContainerStyle={styles.container}>
      <ScrollView>
        <Modal
          animationType='slide'
          transparent={false}
          visible={modalVisible}
          style={{ backgroundColor: 'gray' }}
        >
          <View style={{ marginTop: 22, padding: 20 }}>
            <View>
              <Text
                style={styles.titleText}>
                Edit Your Course
              </Text>
              <CourseRegistration onRecordSaveButtonPress={updateCourseData} />
              <Button
                title='Hide'
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
        </Modal>
        {
          isMyCourse ? (
            <Button
              title='Edit'
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          ) : null
        }
        <View style={styles.contentWrap}>
          <Text
            style={styles.titleText}>
            {course.title}
          </Text>
          <Text
            style={styles.subTitleText}>
            {course.description}
          </Text>
        </View>
        <View style={styles.info}>
          <Text
            style={styles.dateText}>
            {course.ispublic ? 'public' : 'private'}
          </Text>
          <Text style={styles.dateText}>
            date :
            {changeDateFormat(course.createdAt)}
          </Text>
          <Text style={styles.byText}>
            by :
            {course.created_by.name}
          </Text>
          <Text style={styles.locationText}>
            {course.start_location.address}
          </Text>
        </View>
        <View style={styles.contentWrap}>
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
    marginTop: 20
  },
  contentWrap: {
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  info: {
    flexDirection:'column',
    alignItems: 'flex-start',
    padding: 20
  },
  titleText: {
    color: colorConstans.mainColor,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10
  },
  locationText: {
    fontSize: 18,
    color: colorConstans.tintTextColor,
    fontWeight: 'bold',
    fontStyle: 'italic'
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

export default CourseDetailScreen;
