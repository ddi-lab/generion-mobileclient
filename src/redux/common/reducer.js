import * as actionTypes from './types';

const initialState = {
  infoCodes: [],
  infoCodesKey: null,
  infoFields: [],
  infoFieldsKey: null,
  infoTypes: [],
  infoTypesKey: null,
};

const handlers = {};

// Get info codes
handlers[actionTypes.GET_INFORMATION_CODES_SUCCESS] = (state, action) => ({
  ...state,
  infoCodes: action.payload,
});

// Get info fields
handlers[actionTypes.GET_INFORMATION_FIELDS_SUCCESS] = (state, action) => ({
  ...state,
  infoFields: action.payload,
});

// Get info types
handlers[actionTypes.GET_INFORMATION_TYPES_SUCCESS] = (state, action) => ({
  ...state,
  infoCodes: action.payload,
});

export default (state = initialState, action) => {
  if (action.type in handlers) {
    return handlers[action.type](state, action);
  }
  return state;
};
