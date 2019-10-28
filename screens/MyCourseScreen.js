import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { Spinner } from 'native-base';

import MyCourseListItem from '../components/MyCourseListItem';
import { getMyCourses, updateCourseInfo, deleteCourse } from '../api';

export default class MyCourseScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myCourses: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.handleLoadMyCourse();
  }

  handleLoadMyCourse = async () => {
    this.setState({
      isLoading: true
    });
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
      isMyCourse: true,
      updateCourse: this.updateCourse
    });
  };

  updateCourse = async (courseId, title, description, isPublic)  => {
    try {
      this.setState({ isLoading: true });
      await updateCourseInfo(courseId, title, description, isPublic);
      this.handleLoadMyCourse();
    } catch (error) {
      alert('update failed');
    }
  };

  deleteCourse = async courseId => {
    try {
      this.setState({ isLoading: true });
      await deleteCourse(courseId);
    } catch (error) {
      alert('delete failed');
    }
    this.handleLoadMyCourse();
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Spinner />
      );
    }
    return (
      <FlatList
        refreshing={this.state.isLoading}
        onRefresh={() => {
          this.setState({ isLoading: true });
          this.handleLoadMyCourse();
        }}
        data={this.state.myCourses}
        renderItem={course => (
          <MyCourseListItem
            course={course}
            onDeleteButtonPress={this.deleteCourse}
            onListItemPress={this.renderCourseDetail}
          />
        )}
        keyExtractor={(item, i) => (item._id + i)}
      />
    );
  }
}
