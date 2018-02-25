/* eslint-disable no-param-reassign,no-undef,max-len */
import qs from 'qs';
import { Credentials } from '@storage';

const baseUrl = '';

// noinspection JSAnnotator
const clientConfig = {
  baseURL: baseUrl,
  responseType: 'json',
 // transformRequest: data => qs.stringify(data),
  paramsSerializer: params => qs.stringify(params),
  headers: {

  },
};

export default clientConfig;
