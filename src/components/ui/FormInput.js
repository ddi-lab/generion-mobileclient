/* eslint-disable react/prop-types */
/**
 * Text Input
 *
     <FormInput></FormInput>
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormInput } from 'react-native-elements';
import { View, Text,
    StyleSheet } from 'react-native';

// Consts and Libs
import { AppColors, AppFonts } from '@theme/';


const styles = StyleSheet.create({
  title: {

    fontSize: 15,
    letterSpacing: 0.2,
    textAlign: 'left',
    color: '#535557',
  },
});

/* Component ==================================================================== */
class CustomFormInput extends Component {


  static propTypes = {
    containerStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({}),
    ]),
    inputStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({}),
    ]),
  }

  static defaultProps = {
    containerStyle: [],
    inputStyle: [],
  }

  constructor(props) {
    super(props);
  }

  inputProps = () => {
    // Defaults
    const props = {
      ...this.props,
      containerStyle: [{
        borderBottomColor: AppColors.border,
        borderBottomWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginTop: 0,
        marginLeft: 0,
        paddingBottom: 0,
        marginRight: 0,
      }],
      inputStyle: [{
        color: AppColors.textPrimary,

        fontWeight: 'bold',
        paddingHorizontal: 0,
        paddingVertical: 10,
      }],
    };

    if (this.props.containerStyle) {
      props.containerStyle.push(this.props.containerStyle);
    }

    if (this.props.inputStyle) {
      props.inputStyle.push(this.props.inputStyle);
    }


    return props;
  }


  render = () => (

    <View>
      <Text style={styles.title}>{this.props.formTitle}</Text>
      <FormInput
        value={this.props.value}
        onChange={this.onChange}
        {...this.inputProps()}
        editable={this.props.editable}
      />
    </View>
  );
}

/* Export Component ==================================================================== */
export default CustomFormInput;
