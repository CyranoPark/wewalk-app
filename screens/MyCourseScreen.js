import React, { Component } from 'react';
import { Button, Text, Spinner } from 'native-base';
import { View, FlatList, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import CourseThumbnail from '../components/CourseThumbnail';
import { getMyCourses } from '../api';
import { getAddress } from '../utils';
import { bold } from 'ansi-colors';

export default class MyCourseScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myCourses: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.handleLoadMyCourse();
  }

  handleLoadMyCourse = async () => {
    await getMyCourses()
      .then(courses => {
        this.setState({
          isLoading: false,
          myCourses: courses
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  renderCourseDetail = courseData => {
    this.props.navigation.navigate('CourseDetail', {
      courseData,
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 10 }}>
        <FlatList
          refreshing={this.state.isLoading}
          onRefresh={this.handleLoadMyCourse}
          data={this.state.myCourses}
          renderItem={course => <CourseThumbnail course={course} onPressThumbnail={this.renderCourseDetail} />}
          keyExtractor={(item, i) => (item._id + i)}
        />
      </View>
    );
  }
}

MyCourseScreen.navigationOptions = {
  marginTop: 24
};
