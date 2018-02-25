/* eslint-disable max-len,no-param-reassign */
import axios from 'axios';
import { Credentials } from '@storage';
import clientConfig from './clientConfig';
import {
    AsyncStorage,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const ls = require('react-native-local-storage');

// noinspection JSAnnotator
const backendClient = {
  client: axios.create({
    ...clientConfig,
  }),
  // options: {
  //   interceptors: {
  //     request: [async (store, config) => {
  //       const token = await Credentials.getTokenData();// storage.getItem(Config.accessTokenStorageKey);

  //       const item = await AsyncStorage.getItem('city');
  //       const city = JSON.parse(item);

  //       if (city && (!config.params || config.params.city === undefined)) {
  //         config.headers = config.headers || {};
  //         config.headers.city = city.id;
  //       }

  //       if (token && token.password) {
  //         config.headers = config.headers || {};
  //         config.headers.authorization = `Bearer ${token.password}`;
  //       }

  //       return config;
  //     }],
  //   },
  //   onError: (state) => {
  //     const statusCode = state.error.response != null ? state.error.response.status : null;

  //     if (statusCode === 401 || statusCode === 403) {
  //       state.dispatch(UserAction.logout());
  //       Credentials.cleanTokenData().then((credentials) => {
  //         Actions.splash();
  //       });
  //     }
  //   },
  // },
};


export default backendClient;
