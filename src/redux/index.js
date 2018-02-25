/**
 * Combine All Reducers
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import { combineReducers } from 'redux';

// Our custom reducers
// We need to import each one here and add them to the combiner at the bottom
import router from '@redux/router/reducer';
import sideMenu from '@redux/sidemenu/reducer';


import main from '@redux/main/reducer';

import auth from '@redux/auth/reducer';
import common from '@redux/common/reducer';
import records from '@redux/records/reducer';
import orders from '@redux/orders/reducer';

// Combine all
const appReducer = combineReducers({
  router,
  sideMenu,

  main,

  common,
  auth,
  records,
  orders,
});

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
};

export default rootReducer;
