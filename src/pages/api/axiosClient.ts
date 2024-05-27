import axios from "axios";
import { getCookie } from "cookies-next";

const token =getCookie("token");


const axiosClient = axios.create({
    baseURL: 'https://devbe.azseo.net',
    // timeout: 3000,
    headers: {
        Authorization: `Bearer ${token}`,
      },
  });

  export default axiosClient;