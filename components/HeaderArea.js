import React from 'react';
import { Container, Header, Left, Right, Body, Button, Icon, Title, Text } from 'native-base';
import colorConstans from '../constants/Colors';

const HeaderArea = (props) => {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>{props.name}</Title>
        </Body>
        <Right>
          <Button transparent>
            <Text>Cancel</Text>
          </Button>
        </Right>
      </Header>
    </Container>
  );
}

export default HeaderArea;
