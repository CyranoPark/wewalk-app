import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import FeedScreen from '../screens/FeedScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import MyCourseScreen from '../screens/MyCourseScreen';
import RecordNavigator from './RecordNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import LogoutHeader from '../components/LogoutHeader';

import TabBarIcon from '../components/TabBarIcon';
import colorConstans from '../constants/Colors';

const FeedStack = createStackNavigator(
  {
    Feed: {
      screen: FeedScreen,
      navigationOptions: props => {
        return {
          headerRight: <LogoutHeader navigation={props.navigation} />,
          title: 'Feed',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorConstans.mainColor,
          },
        };
      }
    },
    CourseDetail: {
      screen: CourseDetailScreen,
      navigationOptions: {
        title: 'Details',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: colorConstans.mainColor,
        },
      }
    }
  }
);

FeedStack.navigationOptions = () => {
  return {
    tabBarLabel: 'Feed',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name='md-list-box'
      />
    ),
  };
};

FeedStack.path = '';

const RecordStack = createSwitchNavigator(
  {
    Record: RecordNavigator,
  }
);

RecordStack.navigationOptions = {
  tabBarLabel: 'Record',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-recording'} />
  ),
};

RecordStack.path = '';


const myCourseStack = createStackNavigator(
  {
    MyCourse: {
      screen: MyCourseScreen,
      navigationOptions: props => {
        return {
          headerRight: <LogoutHeader navigation={props.navigation} />,
          title: 'Feed',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: colorConstans.mainColor,
          },
        }
      }
    },
    CourseDetail: {
      screen: CourseDetailScreen,
      navigationOptions: {
        title: 'My Course Details',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: colorConstans.mainColor,
        },
      }
    }
  }
);

myCourseStack.navigationOptions = {
  tabBarLabel: 'myCourse',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-archive'}
    />
  ),
};

myCourseStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile'
      }
    },
  }
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  FeedStack,
  RecordStack,
  myCourseStack,
  ProfileStack,
},{
  initialRouteName: 'FeedStack'
});

tabNavigator.path = '';

export default tabNavigator;
