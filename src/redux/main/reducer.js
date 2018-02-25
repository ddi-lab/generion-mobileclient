import * as actionTypes from './types';

const initialState = {
  mainData: null,
  mainDataKey: null,
};

const handlers = {};

// GetMainData
handlers[actionTypes.GET_MAIN_DATA] = (state, action) => ({
  ...state,
  mainData: action.data,
  mainDataKey: Math.random(),
});

export default (state = initialState, action) => {
  if (action.type in handlers) {
    return handlers[action.type](state, action);
  }
  return state;
};
