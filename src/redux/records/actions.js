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
  
  if (accessIds.length === 0) {
    dispatch({
      type: actionTypes.GET_ALL_RECORDS_SUCCESS,
      payload: [],
    });
    return;
  }


  const accesses = await clients.accessStorage.client.request({
    url: `/records/${accessIds.join(':')}`,
    method: 'GET',
  }).then(response => {
    const result = response.data.result;
    const decryptedItems = [];
    result.map((item, index) => {
      if (item.length !== 3) {
        return;
      }
      const dataRaw = decryptWithRSA(rsaKey, item[2]);
      let data = null;
      try {
        data = JSON.parse(dataRaw);
      } catch (error) {}
      if (data === null || !Array.isArray(data) || data.length !== 2) {
        return;
      }
      decryptedItems.push({
        accessId: accessIds[index],
        userAddress: result[0],
        publicKey: result[1],
        data,
      });
    });

    return decryptedItems;
  });

  if (accesses.length === 0) {
    dispatch({
      type: actionTypes.GET_ALL_RECORDS_SUCCESS,
      payload: [],
    });
    return;
  }


  const records = await clients.dataStorage.client.request({
    url: '/documents',
    method: 'POST',
    data: accesses.map(access => access.data[0]),
  }).then(response => {
    const result = response.data;
    const decryptedItems = [];
    result.map((item, index) => {
      const access = accesses.filter(x => x.data[0] === item.address)[0];
      if (access == null) {
        return;
      }

      const recordData = {
        accessId: access.accessId,
        address: access.data[0],
        secret: access.data[1],
        encryptedContent: item.content,
        content: null,
      };

      try {
        recordData.content = decryptAES(recordData.secret, recordData.encryptedContent);
      } catch (error) {}

      if (recordData.content == null) {
        return;
      }
      
      decryptedItems.push(recordData);
    });

    return decryptedItems;
  });

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
    data: {
      records: [accessDataRaw],
    },
  }).then(() => {
    dispatch({
      type: actionTypes.CREATE_RECORD_SUCCESS,
    });
  })
  .catch((error) => {
    console.log(error);
    dispatch({
      type: actionTypes.CREATE_RECORD_FAILURE,
    });
  });
};
