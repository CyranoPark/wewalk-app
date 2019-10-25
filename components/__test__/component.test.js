import React from 'react';
import 'react-native';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import { View, TextInput } from 'react-native';
import { Button, ListItem, Thumbnail, Text, Body, Picker } from 'native-base';

import Map from '../Map';
import LogoutButton from '../LogoutButton';
import MyCourseListItem from '../MyCourseListItem';
import CourseRegistration from '../CourseRegistration';

configure({ adapter: new Adapter() });

import courseMockData from './courseMockData';
import Course from '../Course';

describe('Course Component', () => {
  const totalCourseData = courseMockData;
  const wrapper = shallow(<Course totalCourseData={totalCourseData} />);

  test('should be rendered Map Component', () => {
    expect(wrapper.find(Map).length).toBe(1);
  });
});

describe('logout Component', () => {
  const onLogoutButtonClick = jest.fn();
  const wrapper = shallow(<LogoutButton onLogoutButtonClick={onLogoutButtonClick} />);

  wrapper.find(Button).simulate('press');
  test('should logout action when logoutbutton press', () => {
    expect(wrapper.find(Button).length).toBe(1);
    expect(onLogoutButtonClick).toHaveBeenCalled();
  });
});

describe('MyCourseListItem Component', () => {
  const onListItemPress = jest.fn();
  const onDeleteButtonPress = jest.fn();
  const course = {
    item: {
      thumbnail: 'Thumbnail',
      title: 'Title',
      start_location: {
        address: 'address'
      },
      _id: 'id'
    }
  };
  const wrapper = shallow(
    <MyCourseListItem
      onListItemPress={onListItemPress}
      onDeleteButtonPress={onDeleteButtonPress}
      course={course}
    />
  );

  test('should be rendered listitem', () => {
    expect(wrapper.find(ListItem).length).toBe(1);
    expect(wrapper.find(Thumbnail).length).toBe(1);
    expect(wrapper.find(Button).find(Text).contains('Delete')).toBe(true);
    expect(wrapper.find(Body).find(Text).contains('Title')).toBe(true);
    expect(wrapper.find(Body).find(Text).contains('address')).toBe(true);
  });

  wrapper.find(ListItem).simulate('press');
  wrapper.find(Button).simulate('press');
  test('should invoked function when pressed', () => {
    expect(onListItemPress).toHaveBeenCalled();
    expect(onDeleteButtonPress).toHaveBeenCalled();
  });
});

describe('CourseRegistration Component', () => {
  const onRecordSaveButtonPress = jest.fn();
  const wrapper = shallow(
    <CourseRegistration
      onRecordSaveButtonPress={onRecordSaveButtonPress}
    />
  );

  test('should be rendered listitem', () => {
    expect(wrapper.find(TextInput).length).toBe(2);
    expect(wrapper.find(Picker).length).toBe(1);
    expect(wrapper.find(Button).length).toBe(1);
  });
});
