/* eslint-disable react/prop-types,max-len,no-underscore-dangle,default-case */
/**
 * Launch Screen
 *  - Shows a nice loading screen whilst:
 *    - Preloading any specified app content
 *    - Checking if user is logged in, and redirects from there
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
    Linking,
  Alert,
  Platform,
  StatusBar,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { Credentials } from '@storage';
import { Actions } from 'react-native-router-flux';
import { Bubbles } from 'react-native-loader';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  launchImage: {
    width: AppSizes.screen.width,
    height: AppSizes.screen.height,
  },
});
const qs = require('qs');

/* Component ==================================================================== */
class AppLaunch extends Component {
  static componentName = 'AppLaunch';

  static propTypes = {
  }


  componentDidMount = () => {
    Linking.getInitialURL().then((url) => {
      this.handleOpenURL({
        url,
      });
    });
    if (Platform.OS === 'android') {
      Linking.addEventListener('url', this.handleOpenURL);
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }



        // this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        //       // do some component related stuff
        // });

        // Show status bar on app launch
    StatusBar.setHidden(false, true);
    StatusBar.setBarStyle('dark-content', true);
  }


  componentWillUnmount() {
      // Remove the listener
    Linking.removeEventListener('url', this.appWokeUp);
  }
  appWokeUp = (event) => {
        // this handles the use case where the app is running in the background and is activated by the listener...
        // Alert.alert('Linking Listener','url  ' + event.url)
  //  this.resetStackToProperRoute(event.url);
  }

  handleOpenURL = (event) => {
    Actions.reset('authenticate');

  }
  navigate = (url) => {
   // const { navigate } = this.props.navigation;
    Actions.reset('app');
    if (url) {
      const route = url.replace(/(http[s])?.*?:\/\//g, '');
      const routeName = route.split('/')[1];
      const id = route.split('/')[2];

      setTimeout(() => {
        if (routeName === 'event') {
          Actions.event({
            id,
          });
        }
      }, 500);
    }
  }


  render = () => (
    <View style={[AppStyles.container, { backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }]}>
      <Bubbles size={12} color="#fff" />
    </View>
  );
}

/* Export Component ==================================================================== */
export default AppLaunch;
