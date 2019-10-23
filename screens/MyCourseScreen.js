import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';

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
      isMyCourse: true,
      updateCourse: this.updateCourse
    });
  };

  updateCourse = async (courseId, title, description, isPublic)  => {
    try {
      this.setState({ isLoading: true });
      await updateCourseInfo(courseId, title, description, isPublic);
    } catch (error) {
      alert('update failed');
    }
    await this.handleLoadMyCourse();
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
    console.log(!this.state.myCourses.length);
    if (!this.state.myCourses.length) {
      return (
        <Text>Nothing..</Text>
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
