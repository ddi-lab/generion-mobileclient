/* eslint-disable no-unused-vars */
/**
 * Tabs Scenes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import { Scene, Actions,
    Tabs } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

// Components
import { TabText, TabIcon, BackButton } from '@ui/';
import { View, StyleSheet } from 'react-native';
import { NavbarMenuButton } from '@containers/ui/NavbarMenuButton/NavbarMenuButtonContainer';

import { connect } from 'react-redux';
// Scenes
import { store } from '../index';
import ShareView from '../containers/share/ShareView';

import { Dimensions, Platform } from 'react-native';


import MainView from '@containers/main/MainView';
import CreateView from '@containers/create/CreateView';
import MarketplaceView from '@containers/marketplace/MarketplaceView';
import ConnectView from '@containers/connect/ConnectView';
import PatientsView from '@containers/patients/PatientsView';


const navbarPropsTabs = {
  hideNavBar: true,
  style: {
    paddingTop: AppSizes.statusBarHeight,
    paddingBottom: AppSizes.tabbarHeight,
  },

  navigationBarStyle: AppStyles.navbar,
  titleStyle: AppStyles.navbarTitle,
  backButtonTextStyle: AppStyles.navbarNoTitle,
  leftButtonIconStyle: AppStyles.backButton,
  rightButtonIconStyle: AppStyles.rightButton,
  navBarButtonColor: AppStyles.black,
};

const navbarPropsBigButton = {
  hideNavBar: false,
  navigationBarStyle: AppStyles.navbar,
  titleStyle: AppStyles.navbarTitle,
  backButtonTextStyle: AppStyles.navbarNoTitle,
  leftButtonIconStyle: AppStyles.backButton,
  rightButtonIconStyle: AppStyles.rightButton,
  navBarButtonColor: AppStyles.black,
};

const navbarPropsTabsNoPadding = {
  hideNavBar: true,
  style: {
    paddingBottom: AppSizes.tabbarHeight,
  },
  navigationBarStyle: AppStyles.navbar,
  titleStyle: AppStyles.navbarTitle,
  backButtonTextStyle: AppStyles.navbarNoTitle,
  leftButtonIconStyle: AppStyles.backButton,
  rightButtonIconStyle: AppStyles.rightButton,
  navBarButtonColor: AppStyles.black,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#dddddddd',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});


/* Routes ==================================================================== */
const scenes = (
  <Tabs
    lazy
    key="tabbar"
    showIcon
    gestureEnabled={false}
    animationEnabled={false}
    swipeEnabled={false}
    showLabel={false}
    tabBarStyle={styles.tabBarStyle}
    activeBackgroundColor="white"
    tabBarPosition={'bottom'}
    panHandlers={null}
    duration={Platform.OS === 'android' ? 0 : null}
  >

    <Scene
      key={'coomonGrid'}
      {...navbarPropsTabs}
      buttonTitle={'Main'}
      title={' '}
      component={MainView}
      icon={TabText}
      getTitle={props => (props.title : 'coomonGrid')}
      analyticsDesc={'Placeholder: coomonGrid'}
    />

    {/* <Scene */}
    {/* key={'social'} */}
    {/* {...navbarPropsTabs} */}
    {/* buttonTitle={'Гражданин'} */}
    {/* title={' '} */}
    {/* component={SocialView} */}
    {/* icon={TabText} */}
    {/* getTitle={props => (props.title : 'social')} */}
    {/* analyticsDesc={'Placeholder: social'} */}
    {/* /> */}

    <Scene
      key={'qr'}
      {...navbarPropsTabs}
      buttonTitle={'Create'}
      title={' '}
      component={CreateView}
      icon={TabText}
      getTitle={props => (props.title : 'qr')}
      analyticsDesc={'Placeholder: qr'}
    />

    <Scene
      key={'connect'}
      {...navbarPropsTabs}
      buttonTitle={'Connect'}
      title={' '}
      component={ConnectView}
      icon={TabText}
      getTitle={props => (props.title : 'connect')}
      analyticsDesc={'Placeholder: connect'}
    />

    {/* <Scene */}
    {/* key={'history'} */}
    {/* {...navbarPropsTabs} */}
    {/* buttonTitle={'История'} */}
    {/* title={' '} */}
    {/* component={HistoryView} */}
    {/* icon={TabText} */}
    {/* getTitle={props => (props.title : 'history')} */}
    {/* analyticsDesc={'Placeholder: history'} */}
    {/* /> */}

    <Scene
      key={'share'}
      {...navbarPropsTabs}
      buttonTitle={'Share'}
      title={' '}
      component={ShareView}
      icon={TabText}
      getTitle={props => (props.title : 'profile')}
      analyticsDesc={'Placeholder: profile'}
    />

    <Scene
      key={'patients'}
      {...navbarPropsTabs}
      buttonTitle={'Patients'}
      title={' '}
      component={PatientsView}
      icon={TabText}
      getTitle={props => (props.title : 'patients')}
      analyticsDesc={'Placeholder: patients'}
    />

    {/* <Scene
      key={'marketplace'}
      {...navbarPropsTabs}
      buttonTitle={'Marketplace'}
      title={' '}
      component={MarketplaceView}
      icon={TabText}
      getTitle={props => (props.title : 'marketplace')}
      analyticsDesc={'Placeholder: marketplace'}
    /> */}


  </Tabs>
);

// onRight={() => (<View style={{ height: 60, width: 120, backgroundColor: 'red' }} />)}
export default scenes;
//
//
// <Scene
//     key={'styleGuide'}
//     {...navbarPropsTabs}
//     title={'Style Guide'}
//     tabs={false}
//     component={CreateEvent}
//     onSelect={(el) => {
//         store.dispatch(EventsActions.openCreateModal());
//         // EventsActions.openCreateModal();
//         // Actions.createEvent();
//     }}
//     icon={props => TabIcon({ ...props, icon: 'add' })}
//     analyticsDesc={'StyleGuide: Style Guide'}
// />
