import { COOKIES_KEY } from '@/constants';
// import Cookies from 'js-cookie';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

export interface Token {
  idUser: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const setToken = (token: string, refresh_token: string) => {
  const accessToken = jwtDecode<Token>(token);
  const refreshToken = jwtDecode<Token>(refresh_token);

  // Cookies.set(COOKIES_KEY.TOKEN, token, {
  //   sameSite: 'strict',
  //   expires: new Date(accessToken.exp * 1000),
  //   // path: '/',
  //   // httpOnly: true,
  // });
  setCookie(COOKIES_KEY.TOKEN,token, {
    sameSite:'strict',  
    maxAge:accessToken.exp*1000,
  })
  setCookie(COOKIES_KEY.REFRESH_TOKEN, refresh_token, {
    sameSite: 'strict',
    expires: new Date(refreshToken.exp * 1000),
    // path: '/',
    // httpOnly: true,
  })
  // Cookies.set(COOKIES_KEY.REFRESH_TOKEN, refresh_token, {
  //   sameSite: 'strict',
  //   expires: new Date(refreshToken.exp * 1000),
  //   // path: '/',
  //   // httpOnly: true,
  // });
};

export const getToken = () => {
  const accessToken = getCookie(COOKIES_KEY.TOKEN);
  const refreshToken = getCookie(COOKIES_KEY.REFRESH_TOKEN);

  return {
    accessToken,
    refreshToken,
  };
};

export const removeToken = () => {
  deleteCookie(COOKIES_KEY.TOKEN);
  deleteCookie(COOKIES_KEY.REFRESH_TOKEN);
};
