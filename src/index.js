/* eslint-disable max-len */
/**
 * Index - this is where everything
 *  starts - but offloads to app.js
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
/* global __DEV__ */
import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-native-router-flux';
import { View } from 'react-native';
import { multiClientMiddleware } from 'redux-axios-middleware';
import { Platform } from 'react-native';
// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';
import AppRoutes from '@navigation/';

// All redux reducers (rolled into one mega-reducer)
import rootReducer from '@redux/index';

import clients from '@clients';
import RootContainer from './containers/root/RootContainer';


import 'moment/locale/ru';
import moment from 'moment';

import * as Progress from 'react-native-progress';

// Connect RNRF with Redux
const RouterWithRedux = connect()(Router);

// Load middleware
let middleware = [
  thunk, // Allows action creators to return functions (not just plain objects)
  multiClientMiddleware(clients),
];

if (__DEV__) {
  // Dev-only middleware
  middleware = [
    ...middleware,
   // createLogger(), // Logs state changes to the dev console
  ];
}

// Init redux store (using the given reducer & middleware)
export const store = compose(
  applyMiddleware(...middleware),
)(createStore)(rootReducer);




/* Component ==================================================================== */
// Wrap App in Redux provider (makes Redux available to all sub-components)
export default function AppContainer() {
  moment.locale('ru');
  return (
    <Provider store={store}>
      <RootContainer>
        <RouterWithRedux scenes={AppRoutes} style={AppStyles.appContainer} />

      </RootContainer>
    </Provider>
  );
}
