import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://devbe.azseo.net',
    // timeout: 3000,
   // headers: {'X-Custom-Header': 'foobar'}
  });

  export default axiosClient;