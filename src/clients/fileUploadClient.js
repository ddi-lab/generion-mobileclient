import axios from 'axios';
import clientConfig from './clientConfig';

const fileUploadClient = {
  opts: Object.assign({}, clientConfig, {
    url: `${clientConfig.baseURL}/api/public/0/image/upload`,
    method: 'POST',
    headers: Object.assign({}, clientConfig.headers),
  }),
};

export default fileUploadClient;
