import axios from 'axios';


const dataStorageClient = {
  client: axios.create({
    baseURL: 'http://194.87.92.10:8080/ddi-store-0.0.1-SNAPSHOT/api',
    responseType: 'json',
  }),
};

export default dataStorageClient;
