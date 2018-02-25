import * as actionTypes from './types';

const initialState = {
  allRecordsInProgress: false,
  allRecords: [],
  allRecordsKey: null,

  createInProgress: false,
  createSuccess: false,
  createError: false,
};

const handlers = {};

// Get all records
handlers[actionTypes.GET_ALL_RECORDS_REQUEST] = (state, action) => ({
  ...state,
  allRecordsInProgress: true,
});
handlers[actionTypes.GET_ALL_RECORDS_SUCCESS] = (state, action) => ({
  ...state,
  allRecordsInProgress: false,
  allRecords: action.payload,
  allRecordsKey: Math.random(),
});
handlers[actionTypes.GET_ALL_RECORDS_FAILURE] = (state, action) => ({
  ...state,
  allRecordsInProgress: false,
});

// Create
handlers[actionTypes.CREATE_RECORD_REQUEST] = (state, action) => ({
  ...state,
  createInProgress: true,
  createSuccess: false,
  createError: false,
});
handlers[actionTypes.CREATE_RECORD_SUCCESS] = (state, action) => ({
  ...state,
  createInProgress: false,
  createSuccess: true,
  createError: false,
});
handlers[actionTypes.CREATE_RECORD_FAILURE] = (state, action) => ({
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
