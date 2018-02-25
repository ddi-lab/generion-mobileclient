import React, { Component } from 'react';
import {
  ListView, View, Text, TouchableHighlight,
} from 'react-native';

import { AppStyles, AppSizes, AppColors, AppFonts } from '@theme';

const styles = {
  view: {
    paddingTop: 10,
    paddingBottom: 11,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cdced3',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  contentView: {
  },
  nameWrapper: {
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: AppColors.brand.red,
    paddingLeft: 9,
    paddingRight: 8,
  },
  nameText: {
    ...AppFonts.base.fontSemiBold,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 13,
    letterSpacing: 0.5,
    color: 'white',
  },
  value: {
    ...AppFonts.base.fontSemiBold,
    fontSize: 18,
    lineHeight: 14,
    letterSpacing: 0.1,
    color: '#000000',
    paddingTop: 15,
    paddingLeft: 5,
  },
  statusImage: {
    width: 26,
    height: 25,
    borderRadius: 13,
  },
};

class OrdersListView extends Component {
  static componentName = 'OrdersListView';

  componentDidMount = () => {
  }

  pressRow = (value) => {
    if (this.props.onItemClick) { this.props.onItemClick(value); }
  }

  capitalizeFirstLetter = (string) => {
    if (string == null || string.length === 0) { return string; }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  rowList(val) {
    console.log(val);
    if(val == null) {
      return null;
    }
    return (
      <TouchableHighlight onPress={() => this.pressRow(val)} underlayColor={AppColors.underlayColor}>
        <View style={[AppStyles.roundContainer, {
          borderColor: !val.isChecked ? '#f7f7f7' : 'red' }]}
        >
          <View style={{ flex: 1 }}>
            <Text style={{
              ...AppFonts.base.fontBold,
              color: AppColors.brand.blue,
              fontSize: 11,
            }}
            >{val[0]}</Text>
          </View>


          <Text style={{
            ...AppFonts.base.fontBold,
            marginTop: 10,
            color: 'black',
            fontSize: 14,
          }}
          >{val[2]}NEO ({val[1].length} records)</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <ListView
          removeClippedSubviews={false}
          dataSource={this.props.collectionsDS}
          renderRow={rowData => this.rowList(rowData)}
          renderHeader={this.props.renderHeader}
          vertical
        />
      </View>
    );
  }
}


export default OrdersListView;

