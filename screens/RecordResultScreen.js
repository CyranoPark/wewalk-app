import React from 'react';
import { ScrollView, View } from 'react-native'
import { Container, Button, Text } from "native-base";
import Course from '../components/Course';
import colorConstans from '../constants/Colors';

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
          <Button
            primary
            onPress={onRecordInitButtonPress}
            style={{ textAlign: 'center', backgroundColor: colorConstans.mainColor}}
          >
            <Text>Go to Start</Text>
          </Button>
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
