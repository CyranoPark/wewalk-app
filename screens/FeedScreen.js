import React, { Component } from 'react';
import { Text, Spinner } from 'native-base';
import { View, FlatList } from 'react-native';
import * as Location from 'expo-location';
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
      pageSize: 5
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
        this.setState({
          pageNumber: pageNumber + 1,
          feedCourses: feedCourses.concat(courses),
          isLoading: false
        });
      })
      .catch((err) => {
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

    return currentLocation
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
          onRefresh={this.onRefreshFeed}
          data={this.state.feedCourses}
          renderItem={course => <CourseThumbnail course={course} pageNumber={this.state.pageNumber} onPressThumbnail={this.renderCourseDetail} />}
          keyExtractor={(item, i) => (item._id + i)}
          onEndReached={() => {
            console.log('end')
            this.setState({ isLoading: true });
            this.handleLoadMore();
          }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}


/*
{
  "index": 3,
  "item": Object {
    "__v": 1,
    "_id": "5dad519e15002c3495dcf7da",
    "createdAt": "2019-10-21T06:35:10.689Z",
    "created_by": Object {
      "_id": "5da52c90603caf25fd7eabd5",
      "name": "박한준",
    },
    "description": "주소가나와영",
    "distance": 672,
    "elevation": 0,
    "images_by_location": Array [],
    "ispublic": true,
    "path": Array [
      Object {
        "coordinates": Array [
          127.0591772,
          37.5060256,
        ],
        "timestamp": "2019-10-21T06:35:09.602Z",
        "type": "Point",
      },
      Object {
        "coordinates": Array [
          127.0591772,
          37.5060256,
        ],
        "timestamp": "2019-10-21T06:35:09.602Z",
        "type": "Point",
      },
      Object {
        "coordinates": Array [
          127.0591749,
          37.5060242,
        ],
        "timestamp": "2019-10-21T06:35:12.405Z",
        "type": "Point",
      },
      Object {
        "coordinates": Array [
          127.0591663,
          37.5060133,
        ],
        "timestamp": "2019-10-21T06:35:16.153Z",
        "type": "Point",
      },
      Object {
        "coordinates": Array [
          127.0591717,
          37.5060205,
        ],
        "timestamp": "2019-10-21T06:35:19.868Z",
        "type": "Point",
      },
      Object {
        "coordinates": Array [
          127.0591711,
          37.5060188,
        ],
        "timestamp": "2019-10-21T06:35:23.593Z",
        "type": "Point",
      },
      Object {
        "coordinates": Array [
          127.0591715,
          37.5060205,
        ],
        "timestamp": "2019-10-21T06:35:27.210Z",
        "type": "Point",
      },
    ],
    "start_location": Object {
      "address": "1012-111 Daechi 2(i)-dong, Gangnam-gu, Seoul, South Korea",
      "coordinates": Array [
        127.0591772,
        37.5060256,
      ],
      "timestamp": "2019-10-21T06:35:09.602Z",
      "type": "Point",
    },
    "thumbnail": "https://wewalk.s3.ap-northeast-2.amazonaws.com/course_default.jpg",
    "title": "핫",
    "updatedAt": "2019-10-21T06:35:43.943Z",
  },
  "separators": Object {
    "highlight": [Function highlight],
    "unhighlight": [Function unhighlight],
    "updateProps": [Function updateProps],
  },
}
*/