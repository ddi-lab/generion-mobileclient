import * as actionTypes from './types';

const initialState = {
  allRecordsInProgress: false,
  allRecords: [],
  allRecordsKey: null,

  createInProgress: false,
  createSuccess: false,
  createError: false,

  shareInPropgress: false,
  shareSuccess: false,
  shareError: false,

  patientsRecordsInProgress: false,
  patientsRecords: [],
  patientsRecordsKey: null,
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

// Get patients records
handlers[actionTypes.GET_PATIENTS_RECORDS_REQUEST] = (state, action) => ({
  ...state,
  patientsRecordsInProgress: true,
});
handlers[actionTypes.GET_PATIENTS_RECORDS_SUCCESS] = (state, action) => ({
  ...state,
  patientsRecordsInProgress: false,
  patientsRecords: action.payload,
  patientsRecordsKey: Math.random(),
});
handlers[actionTypes.GET_PATIENTS_RECORDS_FAILURE] = (state, action) => ({
  ...state,
  patientsRecordsInProgress: false,
});

// Share records
handlers[actionTypes.CREATE_RECORD_REQUEST] = (state, action) => ({
  ...state,
  shareInProgress: true,
  shareSuccess: false,
  shareError: false,
});
handlers[actionTypes.CREATE_RECORD_SUCCESS] = (state, action) => ({
  ...state,
  shareInProgress: false,
  shareSuccess: true,
  shareError: false,
});
handlers[actionTypes.CREATE_RECORD_FAILURE] = (state, action) => ({
  ...state,
  shareInProgress: false,
  shareSuccess: false,
  shareError: true,
});


export default (state = initialState, action) => {
  if (action.type in handlers) {
    return handlers[action.type](state, action);
  }
  return state;
};
