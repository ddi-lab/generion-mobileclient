import backend from './backendClient';
import dataStorage from './dataStorageClient';
import accessStorage from './accessStorageClient';

const clients = {
  default: backend,
  dataStorage,
  accessStorage,
};

export default clients;
