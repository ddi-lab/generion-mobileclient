import React, { Component } from 'react';
import {
    ListView, View, Text, TouchableHighlight,
} from 'react-native';
import { CachedImage } from 'react-native-img-cache';

import { AppStyles, AppSizes, AppColors, AppFonts } from '@theme';

const styles = {
  view: {
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cdced3',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentView: {
  },
  name: {
    ...AppFonts.base.fontRegular,
    fontSize: 13,
    lineHeight: 14,
    letterSpacing: 0.1,
    color: '#8e8e93',
  },
  value: {
    ...AppFonts.base.fontRegular,
    fontSize: 13,
    lineHeight: 14,
    letterSpacing: 0.1,
    color: '#000000',
  },
  statusImage: {
    width: 26,
    height: 25,
    borderRadius: 13,
  },
};

class RecordsTypeListView extends Component {
  static componentName = 'RecordsTypeListView';

  componentDidMount = () => {
  }

  pressRow = (val) => {
    this.props.onItemClick(val);
  }

  rowList(val) {
    return (
      <TouchableHighlight onPress={() => this.pressRow(val)} underlayColor={AppColors.underlayColor}>
        <View style={[AppStyles.roundContainer, {
          borderColor: !val.isChecked ? '#f7f7f7' : 'red' }]}
        >

          <Text style={{
            ...AppFonts.base.fontBold,
            color: 'black',
            fontSize: 14,
          }}
          >{val.description}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        {this.props.collectionsDS != null && this.props.collectionsDS.getRowCount() > 0 &&
        <ListView
          removeClippedSubviews={false}
          dataSource={this.props.collectionsDS}
          renderRow={rowData => this.rowList(rowData)}
          vertical
          renderHeader={this.props.renderHeader}
        />
                }
      </View>
    );
  }
}


export default RecordsTypeListView;

