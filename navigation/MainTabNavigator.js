import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import FeedScreen from '../screens/FeedScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import MyCourseScreen from '../screens/MyCourseScreen';
import RecordNavigator from './RecordNavigator';
import LogoutButton from '../components/LogoutButton';

import { logoutAsync } from '../api';

import TabBarIcon from '../components/TabBarIcon';
import colorConstans from '../constants/Colors';

const LogoutHeader = props => {

  const requestLogout = async () => {
    await logoutAsync();
    props.navigation.navigate('Login');
  };

  return <LogoutButton onLogoutButtonClick={requestLogout} />;
};

const FeedStack = createStackNavigator(
  {
    Feed: {
      screen: FeedScreen,
      navigationOptions: props => {
        return {
          headerRight: <LogoutHeader navigation={props.navigation} />,
          title: 'Feed',
          headerTintColor: colorConstans.headerTextColor,
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
        headerTintColor: colorConstans.headerTextColor,
        headerStyle: {
          backgroundColor: colorConstans.mainColor,
        },
      }
    }
  }
);

FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='md-list-box'
    />
  )
};

FeedStack.path = '';

const RecordStack = createSwitchNavigator(
  {
    Record: RecordNavigator
  }
);

RecordStack.navigationOptions = {
  tabBarLabel: 'Record',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-recording'}
    />
  )
};

const myCourseStack = createStackNavigator(
  {
    MyCourse: {
      screen: MyCourseScreen,
      navigationOptions: props => {
        return {
          headerRight: <LogoutHeader navigation={props.navigation} />,
          title: 'myCourse',
          headerTintColor: colorConstans.headerTextColor,
          headerStyle: {
            backgroundColor: colorConstans.mainColor,
          },
        };
      }
    },
    CourseDetail: {
      screen: CourseDetailScreen,
      navigationOptions: {
        title: 'My Course Details',
        headerTintColor: colorConstans.headerTextColor,
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
  )
};

const MainTabNavigator = createBottomTabNavigator(
  {
    FeedStack,
    RecordStack,
    myCourseStack
  },
  {
    initialRouteName: 'FeedStack'
  }
);

export default MainTabNavigator;
