import { encryptAES, decryptAES, decryptWithRSA, encryptWithPublicKey, randomKey, getPublicKeyFromRsa } from '@lib/security';
import backend from './backendClient';
import dataStorage from './dataStorageClient';
import accessStorage from './accessStorageClient';

const clients = {
  default: backend,
  dataStorage,
  accessStorage,
};


export const getRecords = async (address, rsaKey) => {
  const accessIds = await clients.accessStorage.client.request({
    url: `/users/${address}/records`,
    method: 'GET',
  }).then(response => response.data.result);
  if (accessIds.length === 0) {
    return [];
  }
  const publicKey = getPublicKeyFromRsa(rsaKey);
  const accesses = await clients.accessStorage.client.request({
    url: `/records/${accessIds.join(':')}`,
    method: 'GET',
  }).then((response) => {
    const result = response.data.result;
    const decryptedItems = [];
    result.forEach((item, index) => {
      if (item.length !== 3 || item[1] !== publicKey) {
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
        userAddress: item[0],
        publicKey: item[1],
        data,
      });
    });

    return decryptedItems;
  });

  if (accesses.length === 0) {
    return [];
  }


  const records = await clients.dataStorage.client.request({
    url: '/documents',
    method: 'POST',
    data: accesses.map(access => access.data[0]),
  }).then((response) => {
    const result = response.data;
    const decryptedItems = [];
    result.forEach((item) => {
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

  return records;
};


export const createAccessList = async (address, publicKey, items) => {
  const records = items.map(item => ({
    data_pub_key: publicKey,
    data_encr: encryptWithPublicKey(publicKey, JSON.stringify([item.address, item.secret])),
  }));

  await clients.accessStorage.client.request({
    url: `/users/${address}/records/`,
    method: 'POST',
    data: {
      records,
    },
  });
};

export const createRecordList = async (address, publicKey, contentItems) => {
  const accessRequests = contentItems.map(async (content) => {
    const data = {
      address: await randomKey(32),
      secret: await randomKey(32),
    };
    const encryptedContent = encryptAES(data.secret, JSON.stringify(content));

    const dataStoreConfig = {
      url: '/document',
      method: 'POST',
      data: {
        address: data.address,
        content: encryptedContent,
      },
    };
    await clients.dataStorage.client.request(dataStoreConfig);

    return data;
  });

  const accessItems = await Promise.all(accessRequests);
  await createAccessList(address, publicKey, accessItems);
};

export default clients;
