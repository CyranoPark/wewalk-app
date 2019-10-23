import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { Text, Spinner } from 'native-base';

import CourseThumbnail from '../components/CourseThumbnail';

import { getCoursesByLocation } from '../api';
import { getAddress } from '../utils';

export default class FeedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: [],
      feedCourses: [],
      isLoading: false,
      isRefreshing: false,
      pageNumber: 1,
      pageSize: 5,
      isLastLoad: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    this.refreshCurrentLocation()
      .then(location => {
        this.setState({
          currentLocation: location
        });
        this.handleLoadMore();
      });
  }

  handleLoadMore = async () => {
    const { currentLocation, pageNumber, pageSize, feedCourses } = this.state;
    await getCoursesByLocation(pageNumber, pageSize, currentLocation)
      .then(courses => {
        if (!courses.length) {
          this.setState({
            isLastLoad: true,
            isLoading: false
          });
          return;
        }
        this.setState({
          pageNumber: pageNumber + 1,
          feedCourses: feedCourses.concat(courses),
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({
          pageNumber: pageNumber + 1,
          isLoading: false
        });
      });
  };

  onRefreshFeed = async () => {
    await this.refreshCurrentLocation();

    const { currentLocation, pageSize } = this.state;
    await getCoursesByLocation(1, pageSize, currentLocation)
      .then(courses => {
        this.setState({
          pageNumber: 2,
          feedCourses: courses,
          isRefreshing: false
        });
      })
      .catch(() => {
        this.setState({
          pageNumber: 2,
          isRefreshing: false
        });
      });
  };

  refreshCurrentLocation = async () => {
    const location = await Location.getCurrentPositionAsync();
    const { longitude, latitude } = location.coords;
    const currentLocation = [ longitude, latitude ];
    const address = await getAddress(currentLocation);
    currentLocation.push(address.split(' ').slice(1, 4).join(' '));

    return currentLocation;
  };

  renderFooter = () => {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    return null;
  };

  renderCourseDetail = courseData => {
    this.props.navigation.navigate('CourseDetail', {
      courseData,
      isMyCourse: false
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 10 }}>
        <View style={{ width: '90%', marginBottom: 5 }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
            Current Location: {this.state.currentLocation[2]}
          </Text>
        </View>
        <FlatList
          refreshing={this.state.isRefreshing}
          onRefresh={() => {
            this.setState({ isRefreshing : true });
            this.onRefreshFeed();
          }}
          data={this.state.feedCourses}
          renderItem={course => (
            <CourseThumbnail
              course={course}
              pageNumber={this.state.pageNumber}
              onPressThumbnail={this.renderCourseDetail}
            />
          )}
          keyExtractor={(item, i) => (item._id + i)}
          onEndReached={() => {
            if (!this.state.isLastLoad) {
              this.setState({ isLoading: true });
              this.handleLoadMore();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}
