import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button, Picker, Text } from 'native-base';
import colorConstans from '../constants/Colors';

const CourseRegistration = props => {
  const [ titleText, setTitleText ] = useState('');
  const [ descriptionText, setDescriptionText ] = useState('');
  const [ publicStatus, setPublicStatus ] = useState(true);
  const [ isValidateInput, setIsValidateInput ] = useState(true);

  return (
    <View style={{marginBottom: 10}}>
      <Text style={{ color: colorConstans.inputTitle }}>
        title
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Please fill out the course title."
        onChangeText={text => {
          setIsValidateInput(true);
          setTitleText(text);
        }}
        value={titleText}
      />
      <Text style={{ color: colorConstans.inputTitle }}>
        subtitle
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Please fill out a description of the course."
        onChangeText={text => setDescriptionText(text)}
        value={descriptionText}
      />
      <Picker
        selectedValue={publicStatus}
        style={{height: 50, width: 200, color: colorConstans.inputTitle}}
        onValueChange={value =>
          setPublicStatus(value)
        }>
        <Picker.Item label="Public" value={true} />
        <Picker.Item label="Private" value={false} />
      </Picker>
      {
        isValidateInput ?
          null : (
            <View>
              <Text style={{ color: colorConstans.warningText }}>
                Title Text is Required!!
              </Text>
            </View>
          )
      }
      <Button
        primary
        onPress={() => {
          if (titleText.length){
            return props.onRecordSaveButtonPress(titleText, descriptionText, publicStatus);
          }
          setIsValidateInput(false);
        }}
        style={{ justifyContent: 'center', backgroundColor: colorConstans.mainColor}}
      >
        <Text>Save Your Course!!</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderBottomColor: colorConstans.inputBorder,
    borderBottomWidth: 1,
    marginBottom: 10
  }
});

export default CourseRegistration;
