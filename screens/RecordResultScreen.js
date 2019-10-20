import React from 'react';
import { ScrollView, View, TextInput } from 'react-native'
import { Container, Button, Text } from "native-base";
import Course from '../components/Course';
import colorConstans from '../constants/Colors';
import CourseRegistration from '../components/CourseRegistration';

export default RecordResultScreen = props => {
  const { onRecordInitButtonPress, totalCourseData, startLocation, currentLocation, totalCoursePath, totalCourseImages } = props;

  return (
    <Container>
      <View style={{ flex: 1, marginTop: 50 }}>
        <ScrollView contentContainerStyle={{
          alignItems: 'center',
        }}>
          <Text
            style={{
              color: colorConstans.mainColor,
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 50
            }}>
            Record Result
          </Text>
          <View style={{ height: 200 }} >
            <CourseRegistration onRecordInitButtonPress={onRecordInitButtonPress} />
          </View>
          <Course
            totalCourseData={totalCourseData}
            totalCoursePath={totalCoursePath}
            totalCourseImages={totalCourseImages}
            startLocation={startLocation}
            currentLocation={currentLocation}
            style={{ marginBottom: 50 }}
          />
        </ScrollView>
      </View>
    </Container>
  );
};
