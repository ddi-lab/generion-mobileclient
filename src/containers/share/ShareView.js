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

import { getAllRecords } from '@redux/records/actions';
import { createOrder } from '@redux/orders/actions';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { CachedImage } from 'react-native-img-cache';
// Components
import { Spacer, Toolbar, RecordsListView, Button } from '@ui/';

const ParallaxView = require('react-native-parallax-view');


const mapStateToProps = state => ({
  allRecords: state.records.allRecords,
  allRecordsKey: state.records.allRecordsKey,
  account: state.auth.account,
  rsaKey: state.auth.rsaKey,
  createInProgress: state.orders.createInProgress,
  createSuccess: state.orders.createSuccess,
  createError: state.orders.createError,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getAllRecords,
  createOrder,
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

class ShareView extends Component {
  static componentName = 'ShareView';

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {
      collectionsDS: collectionsDS.cloneWithRows([{}]),
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
    if (this.props.allRecords !== null) {
      this.setState({
        collectionsDS: collectionsDS.cloneWithRows(this.props.allRecords || [{}]),
      });
    }
    // if (this.props.account != null) {
    //   setTimeout(() => {
    //     this.props.getAllRecords(this.props.account.address, this.props.rsaKey);
    //   }, 1000);
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.allRecordsKey !== nextProps.allRecordsKey) {
      this.setState({
        allRecords: nextProps.allRecords || [],
        collectionsDS: collectionsDS.cloneWithRows(nextProps.allRecords || [{}]),
      });
    }

    if (this.props.createInProgress && !nextProps.createInProgress) {
      if (nextProps.createSuccess) {
        Actions.marketplace();
      } else {
        alert('Error');
      }
    }
  }


  nextStep =(index) => {
    this.handleChangeTab(index);
  }

  handleChangeTab = (index) => {
    this.setState({
      navigation: { ...this.state.navigation, index },
    });
  }

  validateStep(step) {
    // const notEmpty = value => value !== '' && value !== null;
    //
    // switch (step) {
    //   case '0':
    //     const { name, lastName, birthday } = this.state;
    //     return [name, lastName, birthday].every(notEmpty);
    //
    //   case '1':
    //     const { passphrase, passphraseRepeat } = this.state;
    //     return [passphrase, passphraseRepeat].every(notEmpty);
    //
    //   case '3':
    //     const { photoUri } = this.state;
    //     return notEmpty(photoUri);
    // }

    return true;
  }


  hasCheckedRecords = () => {
    const items = this.state.allRecords || [];
    return items.filter(x => x.isChecked).length > 0;
  }

  onItemChooseChange = (val) => {
    if (this.state.collectionsDS != null) {
      const items = this.state.allRecords || [];
      items.map((item) => {
        if (val.address === item.address) {
          item.isChecked = !item.isChecked;
        }
      });
      this.setState({
        allRecords: items,
        collectionsDS: collectionsDS.cloneWithRows(items),
      });
    }
  }

  createOrder = () => {
    const price = this.state.price;
    const items = this.state.allRecords || [];
    const ids = items.filter(x => x.isChecked).map(x => x.accessId);

    this.props.createOrder(this.props.account.address, ids, price);
  }

  renderScene = ({ route }) => {
    const isSceneValidated = this.validateStep(route.key);

    switch (route.key) {
      case '0' :
        return (
          <View style={styles.tabContainer}>

            {this.hasCheckedRecords() &&

            <View style={styles.floatButton} forceInset={{ bottom: 'always' }}>

              <Button title={'Next'} onPress={() => this.handleChangeTab(1)} upperCase large textOnly />

              </View>
            }
            <RecordsListView
              onItemClick={(val) => {
                this.onItemChooseChange(val);
              }}
              collectionsDS={this.state.collectionsDS}
              renderHeader={this.renderFieldsHeader}
            />

          </View>
        );
      case '1' :
        return (
          <View style={styles.tabContainer}>


            {this.state.price != null && this.state.price.length > 0 && this.state.price > 0 &&

              <View style={styles.floatButton} forceInset={{ bottom: 'always' }}>

                <Button title={'Next'} onPress={() => this.createOrder()} upperCase large textOnly />

              </View>
              }

            <View>
              <Toolbar title={'Another info'} style={{ flex: 1 }} />


              <View style={{ paddingTop: 20 }}>
{/* 
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={'Address'}
                  onChangeText={value => this.setState({
                    address: value,
                  })}
                  value={this.state.address || ''}
                /> */}

                <TextInput
                  style={styles.textInputStyle}
                  placeholder={'Price'}
                  onChangeText={value => this.setState({
                    price: value,
                  })}
                  value={this.state.price || ''}
                />


              </View>
            </View>


          </View>
        );

      default:
        return null;// this.renderRoomView();
    }
  }

  save = () => {
      //   this.state.currentField.id
      //
      // this.state.currentType.id
      // this.state.value.value
  }


  renderFieldsHeader = () => (
    <Toolbar title={'Choose your records'} style={{ flex: 1 }} />
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
          {this.state.collectionsDS.getRowCount() > 0 &&

            <TabViewAnimated
              style={[styles.tabbar, {
                paddingTop: 19,
              }]}
              renderScene={this.renderScene}
              navigationState={this.state.navigation}
              onRequestChangeTab={this.handleChangeTab}
              swipeEnabled={false}
            />
            }
          {this.state.collectionsDS.getRowCount() === 0 &&

          <View style={styles.tabContainer}>{this.renderFieldsHeader()}</View>

            }

        </View>
      </SafeAreaView>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShareView);

