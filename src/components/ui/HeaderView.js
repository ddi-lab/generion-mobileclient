/**
 * Cards
 *
     <Card></Card>
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { CachedImage } from 'react-native-img-cache';

// Consts and Libs
import { AppSizes, AppColors, AppStyles, AppFonts } from '@theme/';

const styles = {
  view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 144,
    paddingTop: 20,
    paddingBottom: 23,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: AppColors.brand.primary,
  },
  title: {
    ...AppFonts.base.fontBold,
    fontSize: 34,
    lineHeight: 36,
    letterSpacing: 0.4,
    color: '#ffffff',
  },
};

/* Component ==================================================================== */
class HeadView extends Component {
  static defaultProps = {
    containerStyle: [],
    titleStyle: [],
  }

  render = () => {
    const {
      title = null,
    } = this.props;
    return (
      <View style={styles.view}>
        {!!title &&
          <Text style={styles.title}>{title}</Text>
        }
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default HeadView;
