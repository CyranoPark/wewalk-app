import React from 'react';
import { Container, Icon, Button, Text, Content, View } from 'native-base';
import HeaderArea from '../components/HeaderArea';
import colorConstans from '../constants/Colors';

export default RecordResultScreen = props => {
  const { onRecordInitButtonPress } = props;
  return (
    <Container>
      <Content
        contentContainerStyle={{
          alignItems:'center'
        }}
      >
        <View>
          <Text
            style={{
              color: colorConstans.mainColor,
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 50
            }}>
            RESULT
          </Text>
          <Button light
            onPress={onRecordInitButtonPress}
          >
            <Text>END walking</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};
