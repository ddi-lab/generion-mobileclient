import axios from 'axios';


const accessStorageClient = {
  client: axios.create({
    baseURL: 'http://35.230.136.204:8090/identity',
  }),
};

export default accessStorageClient;
