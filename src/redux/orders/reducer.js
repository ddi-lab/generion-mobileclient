import * as actionTypes from './types';

const initialState = {
  allOrdersInProgress: false,
  allOrders: [],
  allOrdersKey: null,

  createInProgress: false,
  createSuccess: false,
  createError: false,
};

const handlers = {};

// Get all orders
handlers[actionTypes.GET_ALL_ORDERS_REQUEST] = (state, action) => ({
  ...state,
  allOrdersInProgress: true,
});
handlers[actionTypes.GET_ALL_ORDERS_SUCCESS] = (state, action) => ({
  ...state,
  allOrdersInProgress: false,
  allOrders: action.payload,
  allOrdersKey: Math.random(),
});
handlers[actionTypes.GET_ALL_ORDERS_FAILURE] = (state, action) => ({
  ...state,
  allOrdersInProgress: false,
});

// Create
handlers[actionTypes.CREATE_ORDER_REQUEST] = (state, action) => ({
  ...state,
  createInProgress: true,
  createSuccess: false,
  createError: false,
});
handlers[actionTypes.CREATE_ORDER_SUCCESS] = (state, action) => ({
  ...state,
  createInProgress: false,
  createSuccess: true,
  createError: false,
});
handlers[actionTypes.CREATE_ORDER_FAILURE] = (state, action) => ({
  ...state,
  createInProgress: false,
  createSuccess: false,
  createError: true,
});

export default (state = initialState, action) => {
  if (action.type in handlers) {
    return handlers[action.type](state, action);
  }
  return state;
};
