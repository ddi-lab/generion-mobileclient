import { encryptAES, decryptAES, decryptWithRSA, encryptWithPass, randomKey, createRSAKey } from '@lib/security';
import clients from '@clients';
import * as actionTypes from './types';
import recordsData from '../__data/recordsData';
import { encryptWithRSA } from '../../lib/security';


export const getAllRecords = (address, rsaKey) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_ALL_RECORDS_REQUEST,
  });

  const accessIds = await clients.accessStorage.client.request({
    url: `/users/${address}/records`,
    method: 'GET',
  }).then(response => response.data.result)
    .catch(() => {
      dispatch({
        type: actionTypes.GET_ALL_RECORDS_FAILURE,
      });
    });
  
  const accessRequests = [];
  accessIds.map(id => {
    accessRequests.push(
      clients.accessStorage.client.request({
        url: `/records/${id}`,
        method: 'GET',
      }).then(response => {
        const result = response.data.result;
        const data = {
          accessId: id,
          userAddress: result[0],
          publicKey: result[1],
          data: decryptWithRSA(rsaKey, result[2]),
        };

        return data;
      }),
    );
  });
  
  const accesses = await Promise.all(accessRequests);

  const recordsRequests = [];
  accesses.map(access => {
    let recordData = null;

    try {
      var data = JSON.parse(access.data);
      if(data != null && Array.isArray(data) && data.length === 2) {
        recordData = {
          accessId: access.accessId,
          address: data[0],
          secret: data[1],
        };
      }
    } catch (error) {

    }

    if(recordData === null) {
      return;
    }
    const dataStoreConfig = {
      url: `/document/${recordData.address}`
    };
    recordsRequests.push(
      clients.dataStorage.client.request(dataStoreConfig)
        .then(({ data }) => {
          console.log([recordData.secret, data.content]);
          return {
            ...recordData,
            content: decryptAES(recordData.secret, data.content),
          };
        }),
    );
  });
  
  const records = await Promise.all(recordsRequests);
  dispatch({
    type: actionTypes.GET_ALL_RECORDS_SUCCESS,
    payload: records,
  });
};

export const createRecord = (address, rsaKey, data) => async (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_RECORD_REQUEST
  });
  const docSecret = await randomKey(32);
  const docAddress = await randomKey(32);
  const dataData = encryptAES(docSecret, JSON.stringify(data));

  const dataStoreConfig = {
    url: '/document',
    method: 'POST',
    data: {
      address: docAddress,
      content: dataData,
    },
  };
  const dataStoreResult = await clients.dataStorage.client.request(dataStoreConfig)
    .catch(error => {
      alert('Error in Data Store');
      dispatch({
        type: actionTypes.CREATE_RECORD_FAILURE,
      });
    });

  const accessDataRaw = {
    data_pub_key: docAddress,
    data_encr: encryptWithRSA(rsaKey, JSON.stringify([docAddress, docSecret])),
  };


  await clients.accessStorage.client.request({
    url: `/users/${address}/records/`,
    method: 'POST',
    data: accessDataRaw,
  }).then(() => {
    dispatch({
      type: actionTypes.CREATE_RECORD_SUCCESS,
    });
  })
  .catch(() => {
    dispatch({
      type: actionTypes.CREATE_RECORD_FAILURE,
    });
  });
};
