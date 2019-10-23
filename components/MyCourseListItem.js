import React from 'react';
import { Text, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';

const MyCourseListItem = props => {
  const { onListItemPress, onDeleteButtonPress, course } = props;

  return (
    <ListItem thumbnail onPress={() => onListItemPress(course.item)}>
      <Left>
        <Thumbnail square source={{ uri: course.item.thumbnail }} />
      </Left>
      <Body>
        <Text>{course.item.title}</Text>
        <Text note numberOfLines={2}>{course.item.start_location.address}</Text>
      </Body>
      <Right>
        <Button transparent onPress={() => onDeleteButtonPress(course.item._id)}>
          <Text>Delete</Text>
        </Button>
      </Right>
    </ListItem>
  );
};
export default MyCourseListItem;
