import {
  getRecords,
  createAccessList,
  createRecordList,
} from '@clients';
import { getPublicKeyFromRsa } from '@lib/security';
import * as actionTypes from './types';

export const getAllRecords = (address, rsaKey) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_ALL_RECORDS_REQUEST,
  });

  const records = await getRecords(address, rsaKey)
    .catch(() => {
      dispatch({
        type: actionTypes.GET_ALL_RECORDS_FAILURE,
      });
    });

  dispatch({
    type: actionTypes.GET_ALL_RECORDS_SUCCESS,
    payload: records,
  });
};

export const createRecord = (address, rsaKey, data) => async (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_RECORD_REQUEST,
  });
  const publicKey = getPublicKeyFromRsa(rsaKey);
  await createRecordList(address, publicKey, [data])
    .catch(() => {
      dispatch({
        type: actionTypes.CREATE_RECORD_FAILURE,
      });
    });

  dispatch({
    type: actionTypes.CREATE_RECORD_SUCCESS,
  });
};


export const shareRecords = (address, publicKey, items) => async (dispatch) => {
  dispatch({
    type: actionTypes.SHARE_RECORDS_REQUEST,
  });

  await createAccessList(address, publicKey, items)
    .catch(() => {
      dispatch({
        type: actionTypes.SHARE_RECORDS_FAILURE,
      });
    });

  dispatch({
    type: actionTypes.SHARE_RECORDS_SUCCESS,
  });
};

export const getPatitensRecords = (address, rsaKey) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_PATIENTS_RECORDS_REQUEST,
  });

  const records = await getRecords(address, rsaKey)
    .catch(() => {
      dispatch({
        type: actionTypes.GET_PATIENTS_RECORDS_FAILURE,
      });
    });

  dispatch({
    type: actionTypes.GET_PATIENTS_RECORDS_SUCCESS,
    payload: records,
  });
};
