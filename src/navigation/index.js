/**
 * App Navigation
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';
// Consts and Libs
import { AppConfig } from '@constants/';
import { View, Text } from 'react-native';
import { BackButton, NavBar } from '@ui/';
// Components
// Scenes
import AppLaunch from '@containers/Launch/LaunchContainer';
import Authenticate from '@containers/auth/AuthenticateView';
import TabsScenes from './tabs';


import CreateRecordView from '@containers/records/CreateRecordView';

/* Routes ==================================================================== */
export default Actions.create(
  <Overlay key="overlay">

    <Modal
      key="modal"
      hideNavBar
    >
      <Scene
        hideNavBar
        key={'splash'}
        component={AppLaunch}
        analyticsDesc={'AppLaunch: Launching App'}
      />

      <Scene
        hideNavBar
        key={'authenticate'}
        component={Authenticate}
        analyticsDesc={'Authentication'}
      />



      <Scene
        hideNavBar
        key={'createRecord'}
        title={' '}
        component={CreateRecordView}
      />




      <Lightbox key={'app'}>
        <Stack initial >
          {/* Main App */}
          <Scene
            key={'app2'}
            title={AppConfig.appName}
            hideNavBar
            initial
          >
            {/* Drawer Side Menu */}
            <Scene key={'home'} hideNavBar initial>
              {/* Tabbar */}
              {TabsScenes}
            </Scene>




          </Scene>



        </Stack>
      </Lightbox>
    </Modal>
  </Overlay>,
);
