import React from 'react';
import { StyleSheet } from 'react-native'
import { Container, Button, Text, Spinner, View } from 'native-base';
import colorConstans from '../constants/Colors';
import mockData from '../constants/locationData';

export default RecordStartScreen = props => {
  const { onRecordStartButtonPress, isLoadingRecordScreen } = props;
  return (
    <Container style={styles.container}>
      <View>
        <Text
          style={{
            color: colorConstans.mainColor,
            fontSize: 40,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 50
          }}>
          START
        </Text>
          {
            isLoadingRecordScreen ?
            <Spinner /> :
            <Button
              primary
              onPress={onRecordStartButtonPress}
              style={{backgroundColor: colorConstans.mainColor}}
            >
              <Text>start Record</Text>
            </Button>
          }
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
