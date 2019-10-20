import React, { Component } from 'react';
import { Button, Text } from 'native-base';
import HeaderArea from '../components/HeaderArea';
import { View, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import CourseThumbnail from '../components/CourseThumbnail';
import { getCoursesByLocation } from '../api';

export default class FeedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedCourses: [],
      pageNumber: 1,
      pageSize: 5
    };
  }

  componentDidMount() {
    const { pageNumber, pageSize } = this.state;
    getCoursesByLocation(pageNumber, pageSize)
      .then(courses => {
        this.setState({
          feedCourses: this.state.feedCourses.concat(courses)
        });
      });
  }
  render() {
    console.log(this.state.feedCourses)
    return (
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 10 }}>
        <FlatList
          contentContainerStyle={{ width: '95%' }}
          data={this.state.feedCourses}
          renderItem={items => <CourseThumbnail items={items} pageNumber={this.state.pageNumber} />}
          keyExtractor={item => item._id}
          onEndReached={() => {console.log('ddddd')}}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
        />
      // </View>
    );
  }
}

FeedScreen.navigationOptions = {
  marginTop: 24
};
