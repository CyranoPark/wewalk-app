import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, CardItem, Text } from "native-base";
import colorConstans from '../constants/Colors';
import Map from './Map';
import {
  changeElevationFormat,
  changeDistanceFormat,
  changeRecordTimeFormat,
  changeSpotTimeFormat
} from '../utils/index';

const Course = props => {
  const { totalCourseData, startLocation, currentLocation, totalCoursePath, totalCourseImages } = props;
  const lastLocation = totalCourseData.path[totalCourseData.path.length - 1];
  const endTime = lastLocation.timestamp;

  const renderImagesByLocation = spots => {
    if (!spots.length) {
      return (
        <CardItem header>
          <Text style={{ color: colorConstans.mainColor }}>
            No Images..
          </Text>
        </CardItem>
      )
    }
    return spots.map((spot, i) => {
      return (
        <Card key={i}>
          <CardItem header>
            <Text style={{ color: colorConstans.mainColor }}>
              {changeSpotTimeFormat(startLocation.timestamp, spot.location.timestamp)}
            </Text>
          </CardItem>
          <CardItem cardBody style={styles.courseData}>
          <Image source={{uri: spot.image_url}} style={{height: 200, width: null, flex: 1}} />
          </CardItem>
        </Card>
      );
    });
  };

  return (
    <>
      <Card style={styles.courseDataCard}>
        <CardItem header bordered>
          <Text style={{ color: colorConstans.mainColor }}>
            Total Course Data
          </Text>
        </CardItem>
        <CardItem bordered style={styles.courseData}>
          <View style={styles.board}>
            <View style={styles.column}>
              <Text style={styles.titleText}>Total Elevation</Text>
              <Text style={styles.dataText}>
                {changeElevationFormat(totalCourseData.elevation)}
                <Text style={styles.text}>m</Text>
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.titleText}>Total Distance</Text>
              <Text style={styles.dataText}>
                {changeDistanceFormat(totalCourseData.distance)}
                <Text style={styles.text}>Km</Text>
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.titleText}>Total Time</Text>
              <Text style={styles.dataText}>
                {changeRecordTimeFormat(totalCourseData.start_location.timestamp, endTime)}
                <Text style={styles.text}>min</Text>
              </Text>
            </View>
          </View>
        </CardItem>
      </Card>
      <Card style={styles.courseDataCard}>
        <CardItem header bordered>
          <Text style={{ color: colorConstans.mainColor }}>
            Course Map
          </Text>
        </CardItem>
        <CardItem bordered style={styles.courseMap}>
          <Map
            style={styles.mapview}
            startLocation={startLocation}
            currentLocation={currentLocation}
            totalCoursePath={totalCoursePath}
            totalCourseImages={totalCourseImages}
          />
        </CardItem>
      </Card>
      <Card style={styles.courseDataCard}>
        <CardItem header bordered>
          <Text style={{ color: colorConstans.mainColor }}>
            Time Line
          </Text>
        </CardItem>
          {renderImagesByLocation(totalCourseImages)}
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  courseDataCard: {
    width: '90%',
  },
  subDataCard: {
    width: '100%',
  },
  courseMap: {
    width: '100%',
    height: 200
  },
  courseData:{
    width: '100%',
  },
  board: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 8
  },
  column: {
    justifyContent: 'center',
    width: '30%',
  },
  content: {
    flexDirection: 'column'
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dataText: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  titleText: {
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mapview: {
  },
});

export default Course;
