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
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { CachedImage } from 'react-native-img-cache';
import moment from 'moment';
// Consts and Libs
import { Actions } from 'react-native-router-flux';
import { AppStyles, AppFonts, AppColors, AppSizes } from '@theme/';

// Components

import { Spacer, OrdersListView, Toolbar, CommonContentSlider, EventSlider, EventSliderItem, TokensView, AssetsListView, PlaceSlider, EventRawItem, EventSmallSliderItem, EventSmallSlider, FavoritesView } from '@ui/';
import { connect } from 'react-redux';

import { getAllOrders } from '@redux/orders/actions';
import CustomToolbar from '../../components/ui/Toolbar';


/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  allOrders: state.orders.allOrders,
  allOrdersKey: state.orders.allOrdersKey,
  allOrdersInProgress: state.orders.allOrdersInProgress,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getAllOrders,
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
});

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const collectionsDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class MainView extends Component {
  static componentName = 'MainView';

  static propTypes = {
  }

  constructor(props) {
    super(props);

    this.state = {
      collectionsDS: collectionsDS.cloneWithRows([]),
      headerData: [{
        name: 'Create',
        imageUrl: 'https://pp.userapi.com/c824701/v824701138/9017c/Xf-1DZLKmQk.jpg',
      }, {
        name: 'Share',
        imageUrl: 'https://pp.userapi.com/c824701/v824701138/9017c/Xf-1DZLKmQk.jpg',
      }],
    };
  }

  componentDidMount = () => {
    if (this.props.allOrders !== null) {
      this.setState({
        collectionsDS: collectionsDS.cloneWithRows([]),
      });
    }
    this.props.getAllOrders();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.allOrdersKey !== nextProps.allOrdersKey) {
      this.setState({
        collectionsDS: collectionsDS.cloneWithRows(nextProps.allOrders || []),
      });
    }
  }

  onRefresh = () => {
    if (!this.props.allOrdersInProgress) {
      this.props.getAllOrders();
    }
  }

  onSelectItem = () => {
    alert('The purchase of data has not implemented yet in the mobile application');
  }

  renderHeader = () => (
    <View>
      <View style={AppStyles.headerContainer}>
        <Toolbar title={'Data\nMarketplace'} style={{ flex: 1, color: 'white' }} allowBack />
      </View>
    </View>
  )

  render() {
    return (
      <SafeAreaView style={[AppStyles.appContainer, AppStyles.flex1]} renderToHardwareTextureAndroid >
        <OrdersListView
          style={{ flex: 1, backgroundColor: 'white' }}
          onItemClick={this.onSelectItem}
          collectionsDS={this.state.collectionsDS}
          renderHeader={this.renderHeader}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this.onRefresh}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

