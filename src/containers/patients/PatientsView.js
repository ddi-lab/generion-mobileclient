/* eslint-disable no-unused-vars,class-methods-use-this,react/prop-types,no-underscore-dangle,no-return-assign,max-len */
/**
 * PopularPost View Screen
 *  - The individual PopularPost screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import {
  TextInput,
  AppRegistry,
  StyleSheet,
  DrawerLayoutAndroid,
  ScrollView,
  TouchableOpacity,
  ListView,
  Image,
  Button as CommonButton,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';


import { loadInfoFields } from '@redux/common/actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// Consts and Libs
import { AppStyles, AppColors, AppSizes, AppFonts } from '@theme/';

import { getPatitensRecords } from '@redux/records/actions';
import { createOrder } from '@redux/orders/actions';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { CachedImage } from 'react-native-img-cache';
// Components
import { Spacer, Toolbar, RecordsListView, Button } from '@ui/';

const ParallaxView = require('react-native-parallax-view');


const mapStateToProps = state => ({
  patientsRecords: state.records.patientsRecords,
  patientsRecordsKey: state.records.patientsRecordsKey,
  account: state.auth.account,
  rsaKey: state.auth.rsaKey,
  shareInProgress: state.orders.shareInProgress,
  shareSuccess: state.orders.shareSuccess,
  shareError: state.orders.shareError,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getPatitensRecords,
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },

  textInputStyle: {
    height: 50,
    borderColor: '#e3e3e3',
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
  },

  floatButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  tabContainer: {
    height: '100%',
  },
  title: {
    fontSize: 15,
    ...AppFonts.base.fontBold,
    lineHeight: 26,
    textAlign: 'left',
    color: '#0066ff',
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  bigTitle: {
    fontSize: 40,
    ...AppFonts.base.fontBlack,
    lineHeight: 40,
    textAlign: 'left',
    color: 'black',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  smalTitle: {
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: -0.25,
    color: 'black',
    marginLeft: 20,
    marginRight: 20,
  },
});


const collectionsDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class PatientsView extends Component {
  static componentName = 'PatientsView';

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {
      collectionsDS: collectionsDS.cloneWithRows([]),
      navigation: {
        index: 0,
        routes: [
          { key: '0', title: '1' },
          { key: '1', title: '2' },
          { key: '2', title: '3' },
          { key: '3', title: '4' },
          { key: '4', title: '4' },
        ],
      },
    };
  }


  componentDidMount = () => {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.patientsRecordsKey !== nextProps.patientsRecordsKey) {
      this.setState({
        collectionsDS: collectionsDS.cloneWithRows(nextProps.patientsRecords || []),
      });
    }
  }

  getRecords = () => {
    const address = this.state.address;

    this.props.getPatitensRecords(address, this.props.rsaKey);
    this.handleChangeTab(1);
  }

  handleChangeTab = (index) => {
    this.setState({
      navigation: { ...this.state.navigation, index },
    });
  }

  renderScene = ({ route }) => {
    console.log(route);
    switch (route.key) {
      case '0':
        return (
          <View style={styles.tabContainer}>


            {this.state.address != null && this.state.address.length > 0 &&

              <View style={styles.floatButton} forceInset={{ bottom: 'always' }}>

                <Button title={'Get patient records'} onPress={() => this.getRecords()} upperCase large textOnly />

              </View>
            }

            <View>
              <Toolbar title={'Patient\'s address'} style={{ flex: 1 }} />


              <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>

                <TextInput
                  style={styles.textInputStyle}
                  placeholder={'Address'}
                  onChangeText={value => this.setState({
                    address: value,
                  })}
                  value={this.state.address || ''}
                />


              </View>
            </View>


          </View>
        );
      case '1':
        return (
          
          <View style={styles.tabContainer}>
            <RecordsListView
              collectionsDS={this.state.collectionsDS}
              renderHeader={this.renderFieldsHeader}
            />

          </View>
        );

      default:
        return null;
    }
  }

  renderFieldsHeader = () => (
    <Toolbar title={'Patient\'s records'} style={{ flex: 1 }} />
  )


  renderHeader = title => (
    <Toolbar title={title} style={{ flex: 1 }} />
  )

  render() {
    return (
      <SafeAreaView style={[AppStyles.appContainer, AppStyles.flex1]} renderToHardwareTextureAndroid >
        <View
          style={{ flex: 1, backgroundColor: 'white' }}
          removeClippedSubviews={false}
        >
          <TabViewAnimated
            style={[styles.tabbar, {
              paddingTop: 19,
            }]}
            renderScene={this.renderScene}
            navigationState={this.state.navigation}
            onRequestChangeTab={this.handleChangeTab}
            swipeEnabled={false}
          />
          {this.state.collectionsDS.getRowCount() === 1 &&

            <View style={styles.tabContainer}>{this.renderFieldsHeader()}</View>

          }

        </View>
      </SafeAreaView>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientsView);

