/* eslint-disable no-plusplus,prefer-const,one-var,radix,array-callback-return,no-param-reassign,react/prop-types */
/**
 * Text Input
 *
     <FormInput></FormInput>
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import moment from 'moment';
import { TouchableHighlight, View } from 'react-native';
// Consts and Libs

import { FormInput } from '@ui/';
import Picker from 'react-native-picker';
/* Component ==================================================================== */
class CustomFormDateInput extends Component {


  constructor(props) {
    super(props);
    this.timeArray = [1981, 1, 1, 1, 0];
  }


  onPress = () => {
    this.showTimePicker();
  }

  setTimeArray = (array) => {
    this.timeArray = array || [];
    let dateTime = moment(this.timeArray.join('-'), 'YYYY-MM-dd-HH-mm');

    if (this.props.onChange) { this.props.onChange(dateTime); }

    return this.timeArray;
  }

  showTimePicker = () => {
    let years = [],
      months = [],
      days = [],
      hours = [],
      minutes = [];

    for (let i = 1; i < 51; i++) {
      years.push(i + 1980);
    }
    for (let i = 1; i < 13; i++) {
      months.push(i);
    }

    for (let i = 1; i < 24; i++) {
      hours.push(i);
    }
    for (let i = 1; i < 32; i++) {
      days.push(i);
    }
    for (let i = 0; i < 60; i++) {
      minutes.push(i);
    }
    const pickerData = [years, months, days, hours, minutes];

    const selectedValue = this.timeArray;
    Picker.init({
      pickerData,
      selectedValue,
      pickerTitleText: 'Select Date and Time',
      wheelFlex: [2, 1, 1, 2, 1, 1],
      onPickerConfirm: (pickedValue) => {
        this.setTimeArray(pickedValue);
      },
      onPickerCancel: (pickedValue) => {
        console.log('area', pickedValue);
      },
      onPickerSelect: (pickedValue) => {
        const targetValue = [...pickedValue];
        if (parseInt(targetValue[1]) === 2) {
          if (targetValue[0] % 4 === 0 && targetValue[2] > 29) {
            targetValue[2] = 29;
          } else if (targetValue[0] % 4 !== 0 && targetValue[2] > 28) {
            targetValue[2] = 28;
          }
        } else if (targetValue[1] in { 4: 1, 6: 1, 9: 1, 11: 1 } && targetValue[2] > 30) {
          targetValue[2] = 30;
        }
                // forbidden some value such as some 2.29, 4.31, 6.31...
        if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
          targetValue.map((v, k) => {
            if (k !== 3) {
              targetValue[k] = parseInt(v);
            }
          });
          Picker.select(targetValue);
          pickedValue = targetValue;
        }
      },
    });
    Picker.show();
  }


  render = () => {
    let time = this.props.time ? this.props.time.format('LLL') : '';
    return (
      <TouchableHighlight onPress={this.onPress}>
        <View>
          <FormInput
            editable={false}
            value={time}
            formTitle={this.props.formTitle}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

/* Export Component ==================================================================== */
export default CustomFormDateInput;
