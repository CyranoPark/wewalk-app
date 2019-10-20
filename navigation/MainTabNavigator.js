import React from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import TabBarIcon from '../components/TabBarIcon';
import FeedScreen from '../screens/FeedScreen';
import MyCourseScreen from '../screens/MyCourseScreen';
import RecordNavigator from './RecordNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import HeaderArea from '../components/HeaderArea';
import colorConstans from '../constants/Colors';

const config = Platform.select({
  headerMode: 'none'
});

const FeedStack = createStackNavigator(
  {
    Feed: {
      screen: FeedScreen,
      navigationOptions: {
        title: 'Feed'
      }
    }
  },
  config
);

FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
  headerTitle: 'Feed',
  drawerWidth: 300,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

FeedStack.path = '';

const RecordStack = createSwitchNavigator(
  {
    Record: RecordNavigator,
  },
  config
);

RecordStack.navigationOptions = {
  tabBarLabel: 'Record',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

RecordStack.path = '';


const myCourseStack = createStackNavigator(
  {
    MyCourse: {
      screen: MyCourseScreen,
      navigationOptions: {
        title: 'My Course'
      }
    }
  },
  config
);

myCourseStack.navigationOptions = {
  tabBarLabel: 'myCourse',
  drawerWidth: 300,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
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
  },
  config
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

export default connect()(tabNavigator);
