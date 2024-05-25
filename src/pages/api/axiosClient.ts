import axios from "axios";
import { token } from "../auth/token";


const axiosClient = axios.create({
    baseURL: 'https://devbe.azseo.net',
    // timeout: 3000,
    headers: {
        Authorization: `Bearer ${token}`,
      },
  });

  export default axiosClient;