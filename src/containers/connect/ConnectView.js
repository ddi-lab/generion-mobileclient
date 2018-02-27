/* eslint-disable no-unused-vars,class-methods-use-this,react/prop-types */
/**
 * PopularPost View Screen
 *  - The individual PopularPost screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  DrawerLayoutAndroid,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  Image,
  Text,
  View,
  WebView,
  RefreshControl,
  Clipboard,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { CachedImage } from 'react-native-img-cache';
import moment from 'moment';
// Consts and Libs
import { Actions } from 'react-native-router-flux';
import { AppStyles, AppFonts, AppColors, AppSizes } from '@theme/';

// Components

import { Spacer, RecordsListView, Toolbar, CommonContentSlider, EventSlider, EventSliderItem, TokensView, AssetsListView, PlaceSlider, EventRawItem, EventSmallSliderItem, EventSmallSlider, FavoritesView } from '@ui/';
import { connect } from 'react-redux';

import { getAllRecords } from '@redux/records/actions';
import CustomToolbar from '../../components/ui/Toolbar';
import { getPublicKeyFromRsa } from '@lib/security';


/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  account: state.auth.account,
  rsaKey: state.auth.rsaKey,
});

// Any actions to map to the component?
const mapDispatchToProps = {
};

const styles = StyleSheet.create({
  container2: {
    paddingTop: 10,
  },
  titleSmall: {

    ...AppFonts.base.fontBlack,
    fontSize: 23,
    color: 'black',
    margin: 20,
    textAlign: 'left',
    marginBottom: 15,
  },


  profileView: {
    backgroundColor: '#0066ff',
  },
  favoritesView: {
    backgroundColor: '#f7f7f7',
  },
  tokensView: {

  },
  assetsView: {

  },

  rowHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',

    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 12,
  },
  rowHeadTitle: {
    ...AppFonts.base.fontBold,
    fontSize: 22,
    color: '#000000',
  },
  rowHeadAction: {
    ...AppFonts.base.fontRegular,
    fontSize: 15,
    letterSpacing: -0.1,
    color: '#0066ff',
  },
  borderSeparator: {
    marginTop: 22,
    marginLeft: 18,
    marginRight: 18,
    height: 1,
    backgroundColor: '#cdced3',
  },
  valueContainer: {
    marginLeft: 18,
    marginRight: 18,
  }
});

class ConnectView extends Component {
  static componentName = 'ConnectView';

  static propTypes = {
  }

  copyToClipboard = (value) => {
    Clipboard.setString(value);
  }

  render() {
    let publicKey = null;
    let address = null;
    if (this.props.rsaKey !== null) {
      publicKey = getPublicKeyFromRsa(this.props.rsaKey);
    }
    if (this.props.account !== null) {
      address = this.props.account.address;
    }
    return (
      <View style={[AppStyles.appContainer, AppStyles.flex1]} renderToHardwareTextureAndroid >
        <View>
          <View style={[AppStyles.headerContainer, { height: 105 }]}>
            <Toolbar title={'Connect'} style={{ flex: 1, color: 'white' }} allowBack />
          </View>
        </View>
        <View>
          <View style={[styles.rowHead, { marginTop: 0 }]}>
            <Text style={styles.rowHeadTitle}>Your address</Text>
            <TouchableOpacity onPress={() => this.copyToClipboard(address)}>
              <Text style={styles.rowHeadAction}>Copy to clipboard</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.valueContainer}>{address || ''}</Text>
          <View style={[styles.rowHead, { marginTop: 0 }]}>
            <Text style={styles.rowHeadTitle}>Your public key</Text>
            <TouchableOpacity onPress={() => this.copyToClipboard(publicKey)}>
              <Text style={styles.rowHeadAction}>Copy to clipboard</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.valueContainer}>{publicKey || ''}</Text>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectView);

