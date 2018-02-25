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
import { createRecord } from '@redux/records/actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// Consts and Libs
import { AppStyles, AppColors, AppSizes, AppFonts } from '@theme/';

import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { CachedImage } from 'react-native-img-cache';
// Components
import { Spacer, Toolbar, RecordsTypeListView, Button } from '@ui/';

const ParallaxView = require('react-native-parallax-view');



const mapStateToProps = state => ({
  infoFields: state.common.infoFields,
  account: state.auth.account,
  rsaKey: state.auth.rsaKey,
  createInProgress: state.records.createInProgress,
  createSuccess: state.records.createSuccess,
  createError: state.records.createError,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  loadInfoFields,
  createRecord,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },

  floatButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInputStyle: {
    height: 50,
    borderColor: '#e3e3e3',
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 20,
    borderWidth: 1,
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
  },
  tabContainer: {
    height: '100%',
  },
  title: {
    ...AppFonts.base.fontBold,
    color: AppColors.brand.blue,
    fontSize: 11,
  },

  subTitle: {
    ...AppFonts.base.fontBold,
    marginTop: 10,
    color: 'black',
    fontSize: 14,
  },
});


const collectionDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });


class CreateView extends Component {
  static componentName = 'CreateView';

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {
      collectionFieldsDS: collectionDS.cloneWithRows([]),
      currentField: null,
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
    if (this.props.loadInfoTypes !== null) {
      this.setState({
        collectionFieldsDS: collectionDS.cloneWithRows(this.props.infoFields),
      });
    }
    this.props.loadInfoFields();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.infoFields !== nextProps.infoFields) {
      this.setState({
        collectionFieldsDS: collectionDS.cloneWithRows(nextProps.infoFields),
      });
    }

    if(this.props.createInProgress && !nextProps.createInProgress) {
      if(nextProps.createSuccess) {
        Actions.app();
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

  save = () => {
    this.handleChangeTab(4);

    const data = {
      type: this.state.currentType.id,
      value: this.state.value.value,
    };

    this.props.createRecord(this.props.account.address, this.props.rsaKey, data);

    
  }

  renderScene = ({ route }) => {
    const isSceneValidated = this.validateStep(route.key);

    switch (route.key) {
      case '0' :
        return (
          <View style={styles.tabContainer}>

            <RecordsTypeListView
              onItemClick={(val) => {
                this.setState({ currentField: val });
                this.handleChangeTab(1);
              }}
              collectionsDS={this.state.collectionFieldsDS}
              renderHeader={this.renderFieldsHeader}
            />

          </View>
        );
      case '1' :
        return (
          <View style={styles.tabContainer}>

            <RecordsTypeListView
              collectionsDS={collectionDS.cloneWithRows(this.state.currentField != null ? this.state.currentField.types : [])}
              onItemClick={(val) => {
                this.setState({ currentType: val });
                if (val.variants != null && val.variants.length > 0) { this.handleChangeTab(2); } else {
                  this.handleChangeTab(3);
                }
              }}
              renderHeader={() => this.renderHeader(this.state.currentField != null ? this.state.currentField.description : '')}
            />

          </View>
        );
      case '2': {
        if (this.state.currentType != null && this.state.currentType.variants.length > 0) {
          return (
            <View style={styles.tabContainer}>

              <RecordsTypeListView
                collectionsDS={collectionDS.cloneWithRows(this.state.currentType != null ? this.state.currentType.variants : [])}
                renderHeader={() => this.renderHeader(this.state.currentType != null ? this.state.currentType.description : '')}
                onItemClick={(val) => {
                  this.setState({ value: val });
                  this.handleChangeTab(3);
                }}
              />

            </View>
          );
        }
        return (<View />);
      }
      case '3' : {
        return (

          <View style={styles.tabContainer}>
            <View style={styles.floatButton} forceInset={{ bottom: 'always' }}>

              <Button title={'Save'} onPress={() => this.save()} upperCase large textOnly />

            </View>
            <View>
              <Toolbar title={'Confirm'} style={{ flex: 1 }} />


              <View style={{ paddingTop: 20 }}>

                <View style={AppStyles.roundContainer}>
                  <View style={{ }}>


                    <Text style={styles.title}>Field</Text>
                  </View>


                  <Text style={styles.subTitle}>{this.state.currentField != null ? this.state.currentField.description : ''}</Text>
                </View>

                <View style={AppStyles.roundContainer}>
                  <View style={{ }}>


                    <Text style={styles.title}>Type</Text>
                  </View>


                  <Text style={styles.subTitle}>{this.state.currentType != null ? this.state.currentType.description : ''}</Text>
                </View>


                <TextInput
                  style={styles.textInputStyle}
                  placeholder={this.state.currentType != null ? this.state.currentType.description : ''}
                  onChangeText={value => this.setState({
                    value: {
                      value,
                    },
                  })}
                  value={this.state.value != null ? this.state.value.value : ''}
                />


              </View>

            </View>


          </View>
        );
      }
      case '4' : {
        return (
          <View style={styles.tabContainer}>
            <Toolbar title={'Saving...'} style={{ flex: 1 }} />


          </View>
        );
      }

      default:
        return null;// this.renderRoomView();
    }
  }


  renderFieldsHeader = () => (
    <Toolbar title={'Choose fields'} style={{ flex: 1 }} />
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

        </View>
      </SafeAreaView>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateView);

