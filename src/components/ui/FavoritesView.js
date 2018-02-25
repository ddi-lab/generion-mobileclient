import React, { Component } from 'react';
import {
  TouchableHighlight,
  Image,
  ListView, View, Text, ScrollView,
} from 'react-native';
import Share from 'react-native-share';

import { Platform } from 'react-native';

import { AppStyles, AppSizes, AppFonts } from '@theme';

import { CachedImage } from 'react-native-img-cache';

class FavoritesView extends Component {

  static componentName = 'FavoritesView';


  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
  }


  // <View style={{ backgroundColor: 'white',
  //     marginLeft: 20,
  //     marginRight: 20,
  //     marginTop: 9,
  //     marginBottom: 9,
  //     padding: 15,
  //     flex: 1,
  //     borderRadius: 8,
  //     flexDirection: 'row',
  //     justifyContent: 'space-between' }}
  // >
  // <Text style={{
  //     ...AppFonts.base.fontBold,
  // }}
  // >{val.name}</Text>
  // <Text style={{
  //     ...AppFonts.base.fontBold,
  //     color: '#0066ff',
  // }}
  // >{val.name}</Text>
  // </View>

  rowList(val, isLast) {
    return (
      <View
        key={val.name}
        style={{
          width: 100,
          marginLeft: 20,
          marginRight: isLast === true ? 20 : 0,
        }}
      >
        <CachedImage
          style={{
            width: 100,
            height: 100,
            borderRadius: 3,
            marginBottom: 11,
          }}
          source={{ uri: val.imageUrl }}
        />

        <Text style={{ color: '#434347', fontSize: 14 }}>{val.name}</Text>
      </View>
    );
  }

  render() {
    const { items } = this.props;

    return (
      <ScrollView
        style={{
          paddingBottom: 10,
        }}
        horizontal
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {items.map((item, index) => {
            const isLast = items.length - 1 === index;

            return this.rowList(item, isLast);
          })}
        </View>
      </ScrollView>
    );
  }
}


export default FavoritesView;
