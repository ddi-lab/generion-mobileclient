/* eslint-disable react/prop-types */
/**
 * Cards
 *
     <Card></Card>
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';

import { Dimensions, Platform } from 'react-native';
// Consts and Libs

import { AppSizes, AppColors, AppFonts } from '@theme/';

import { View, Text, TouchableHighlight } from 'react-native';
/* Component ==================================================================== */
class Toolbar extends Component {

  constructor(props) {
    super(props);
    let title = this.props.title;
    if (this.props.navigator && this.props.navigator.getCurrentRoutes() > 0) {
      title = '';
    }
    this.state = {
      title: this.props.title,
      leftButtonTitle: this.props.leftButtonTitle,
      leftButtonAction: this.props.leftButtonAction,
    };

    this.backMargin = this.props.allowBack ? ((Platform.OS === 'ios') ? 15 : 24) : 0;
  }

  render = () => (

    <View style={{
      flex: 1,
      minHeight: 76,
      flexDirection: 'row',
      marginTop: this.backMargin,
      paddingTop: 25,
      paddingBottom: 25,
      paddingLeft: AppSizes.containerPadding,
      paddingRight: AppSizes.containerPadding,
      alignItems: 'baseline',
      justifyContent: 'space-between',
    }}
    >
      <Text style={{
        fontSize: this.props != null && this.props.style != null && this.props.style.fontSize ? this.props.style.fontSize : 36,
        color: this.props != null && this.props.style != null && this.props.style.color ? this.props.style.color : 'black',
        ...AppFonts.base.fontBlack }}
      >{this.state.title}</Text>
      {this.state.leftButtonTitle &&
      <TouchableHighlight onPress={this.state.leftButtonAction} underlayColor={AppColors.underlayColor}>
        <Text style={{ ...AppFonts.base.fontMedium,
          fontSize: 11,
          paddingBottom: 7,
          color: 'black',
          textAlign: 'justify',
        }}
        >{this.state.leftButtonTitle}</Text>
      </TouchableHighlight>
              }

    </View>

        )
}

/* Export Component ==================================================================== */
export default Toolbar;
