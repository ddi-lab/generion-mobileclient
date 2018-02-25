import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';

// Consts and Libs
import {
    View, Text, StyleSheet, TouchableHighlight, Dimensions, Animated,
    ResolvedAssetSource as scale,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { AppFonts, AppColors } from '@theme/';
import { ShadowImage } from '@ui';

import placeDefaultImage from './PlaceImage/place-default-image.jpg';
import ViewPager from 'rn-viewpager/viewpager/ViewPager';

const width = Dimensions.get('window').width;


/* Component ==================================================================== */
class SliderItem extends Component {

  constructor(props) {
    super(props);
    this.initStyle();
    this.sliderWidth = width;
    if (props.nopadding) { this.sliderWidth = this.sliderWidth - 30; } else {
      this.sliderWidth = this.sliderWidth - 50;
    }
  }

  initStyle = () => {
    this.styles = StyleSheet.create({
      topTitle: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        color: AppColors.brand.blue,
        fontSize: 10,
        ...AppFonts.base.fontExtraBold,
        letterSpacing: 1,

      },
    });
  }


  onPress = () => {
    if (this.props.item != null) { Actions.article({ item: this.props.item }); }
  }


  render = () => {
    const {
      photo = null,
      title,
      description,
    } = this.props.item || {};
    let imageSrc = placeDefaultImage;
    if (photo !== null) {
      imageSrc = { uri: photo };
    }

    return (
      <TouchableHighlight
        renderToHardwareTextureAndroid
        onPress={this.onPress}
        underlayColor={AppColors.underlayColor}
      >
        <View style={{
          marginTop: 18, height: this.sliderWidth, marginLeft: (this.props.nopadding ? 16 : 0) }}
        >

          <ShadowImage
            bigShadow
            useForegraund
            source={imageSrc}
            style={{ width: this.sliderWidth,
              position: 'absolute',
              height: this.sliderWidth,
              marginBottom: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: 'transparent' }}
          />


          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            position: 'absolute',
            width: this.sliderWidth,
            height: this.sliderWidth,
          }}
          >


            <Text style={{ width: this.sliderWidth, color: 'white', fontSize: 28, lineHeight: 28, ...AppFonts.base.fontExtraBold, paddingRight: 24, paddingBottom: 20, paddingLeft: 20 }} numberOfLines={3}>{title}</Text>

          </View>


        </View>
      </TouchableHighlight>
    );
  }
}

/* Export Component ==================================================================== */
export default SliderItem;
