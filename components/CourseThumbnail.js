import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import colorConstans from '../constants/Colors';
import {
  changeDateFormat,
  changeElevationFormat,
  changeDistanceFormat,
  changeSpotTimeFormat
} from '../utils';

const CourseThumbnail = props => {
  const { onPressThumbnail, course } = props;

  return (
    <View style={styles.thumbnailWrap}>
      <TouchableOpacity onPress={() => onPressThumbnail(course.item)}>
        <View style={styles.information}>
          <View style={styles.title}>
            <Text style={styles.courseTitle}>
              {course.item.title}
            </Text>
            <Text style={styles.description}>
              {course.item.description}
            </Text>
          </View>
          <View style={styles.creator}>
            <Text style={styles.titleText}>by</Text>
            <Text style={styles.infoText}>
              {course.item.created_by.name}
            </Text>
            <View style={styles.createDate}>
              <Text style={styles.titleText}>Date</Text>
              <Text style={styles.infoText}>
                {changeDateFormat(course.item.createdAt)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.imageWrap}>
          <Image
            source={{uri : course.item.thumbnail}}
            style={{height: 200, width: 200, flex: 1}}
          />
          <View style={styles.resultData}>
            <View>
              <Text style={styles.titleText}>
                StartLocation
              </Text>
              <Text style={styles.locationText}>
                {course.item.start_location.address}
              </Text>
            </View>
            <View>
              <Text style={styles.titleText}>distance</Text>
              <Text style={styles.dataText}>
                {changeDistanceFormat(course.item.distance)}
                km
              </Text>
            </View>
            <View>
              <Text style={styles.titleText}>elevation</Text>
              <Text style={styles.dataText}>
                {changeElevationFormat(course.item.elevation)}
                m
              </Text>
            </View>
            <View>
              <Text style={styles.titleText}>time</Text>
              <Text style={styles.dataText}>
                {changeSpotTimeFormat(course.item.start_location.timestamp, course.item.path[course.item.path.length - 1].timestamp)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  thumbnailWrap: {
    height: 300,
    marginBottom: 10,
    width: '98%',
    borderColor: '#ccc',
    borderWidth: 1
  },
  information: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
  },
  title: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  locationText: {
    fontSize: 10,
    color: colorConstans.mainColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  infoText: {
    fontSize: 15,
    color: colorConstans.mainColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  creator: {
    width: '50%',
    justifyContent: 'center',
  },
  imageWrap: {
    height: 200,
    flexDirection: 'row',
  },
  courseTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    color: colorConstans.mainColor,
    fontWeight: 'bold',
  },
  resultData: {
    position: 'absolute',
    justifyContent: 'center',
    padding: 5,
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 8,
    width: 150,
  },
  dataText: {
    fontSize: 20,
    color: colorConstans.mainColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  titleText: {
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default CourseThumbnail;
