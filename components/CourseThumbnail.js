import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import colorConstans from '../constants/Colors';

const CourseThumbnail = props => {
  const { onScrollDownToBottom, pageNumber } = props;
  return (
    <View style={styles.thumbnailWrap}>
      <TouchableOpacity onPress={() => onScrollDownToBottom(pageNumber + 1)}>
      <View style={styles.information}>
        <View style={styles.startLocation}>
          <Text style={styles.titleText}>
            StartLocation
          </Text>
          <Text style={styles.infoText}>
            여기는 시작점 주소 입니다.
          </Text>
        </View>
        <View style={styles.creator}>
          <Text style={styles.titleText}>Creator</Text>
          <Text style={styles.infoText}>hanjunpark</Text>
          <View style={styles.createDate}>
            <Text style={styles.titleText}>Created At</Text>
            <Text style={styles.infoText}>2019년 10월 19일</Text>
          </View>
        </View>
      </View>
      <View style={styles.imageWrap}>
        <Image
          source={{uri : 'https://wewalk.s3.ap-northeast-2.amazonaws.com/58C7681F-FDA7-45CC-9B28-585FE63AE5CF.jpg'}}
          style={{height: 200, width: 200, flex: 1}}
        />
        <View style={styles.resultData}>
          <View>
            <Text style={styles.titleText}>distance</Text>
            <Text style={styles.dataText}>12km</Text>
          </View>
          <View>
            <Text style={styles.titleText}>elevation</Text>
            <Text style={styles.dataText}>122m</Text>
          </View>
          <View>
            <Text style={styles.titleText}>time</Text>
            <Text style={styles.dataText}>00:00:00</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  thumbnailWrap: {
    // flex: 1,
    height: 300,
    marginBottom: 10,
    // width: '90%',
    borderColor: '#ccc',
    borderWidth: 1
  },
  information: {
    height: 100,
    flexDirection: 'row',
  },
  startLocation: {
    width: '50%',
    justifyContent: 'center',
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
  resultData: {
    position: 'absolute',
    justifyContent: 'center',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 8,
    width: 100,
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

/*
  {
    start_location: {
      type: 'Point',
      coordinates: [Array],
      timestamp: 2019-10-20T06:56:31.133Z
    },
    thumbnail: 'https://wewalk.s3.ap-northeast-2.amazonaws.com/course_default.jpg',
    _id: 5dac051f6831acb63aabd279,
    created_by: 5da52c90603caf25fd7eabd5,
    path: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    distance: 22310,
    elevation: 57.3205795288086,
    images_by_location: [],
    createdAt: 2019-10-20T06:56:31.432Z,
    updatedAt: 2019-10-20T06:57:12.348Z,
    __v: 1
  }
*/