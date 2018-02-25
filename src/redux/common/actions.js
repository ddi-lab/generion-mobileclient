import * as actionTypes from './types';
import infoCodes from '../__data/informationCodes';
import infoFiels from '../__data/informationFields';
import infoTypes from '../__data/informationTypes';

export const loadInfoCodes = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_INFORMATION_CODES_REQUEST });

  dispatch({
    type: actionTypes.GET_INFORMATION_CODES_SUCCESS,
    payload: infoCodes.codes,
  });
};

export const loadInfoFields = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_INFORMATION_FIELDS_REQUEST });

  dispatch({
    type: actionTypes.GET_INFORMATION_FIELDS_SUCCESS,
    payload: infoFiels.fields,
  });
};

export const loadInfoTypes = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_INFORMATION_TYPES_REQUEST });

  dispatch({
    type: actionTypes.GET_INFORMATION_TYPES_SUCCESS,
    payload: infoTypes.types,
  });
};
