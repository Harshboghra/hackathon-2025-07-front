import axios, { AxiosResponse } from 'axios';
import config from '../../config/config';
import store from '../../state/store';
import { authService } from '../../service/auth/auth.service';
import {
  setAccessToken,
  setLoginDialogOpen,
} from '../../state/auth/auth.reducer';
import { pushMessage } from '../../contexts/message';

const request = axios.create({
  baseURL: config.publicUrl, // url = base url + request url
  timeout: 1 * 60 * 1000, // 1 minute
  headers: {
    Accept: 'application/json',
  },
  // withCredentials: true,
});

request.interceptors.request.use(
  (config) => {
    const auth = store && store.getState().auth?.login?.data; // Replace 'auth' with the name of your auth slice
    // Check if the token is expired or needs to be refreshed
    if (auth?.access_token && config.headers) {
      config.headers.Authorization = `Bearer ${auth.access_token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);
request.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const { response } = error;
    const prevRequestConfig = error.config;
    switch (response?.status) {
      // Authorization Failed Response Manage Here
      case 401:
        if (
          !prevRequestConfig.headers['X-RefreshToken'] &&
          store.getState().auth.login.data?.refresh_token
        ) {
          try {
            const { access_token } = await authService.refreshToken(
              store.getState().auth.login.data?.refresh_token as string,
            );
            store.dispatch(setAccessToken(access_token));
            prevRequestConfig.headers['Authorization'] =
              `Bearer ${access_token}`;
            return request({
              ...prevRequestConfig,
              headers: prevRequestConfig.headers.toJSON(),
            });
          } catch (error) {
            store.dispatch(setLoginDialogOpen(true));
          }
        } else {
          store.dispatch(setLoginDialogOpen(true));
        }
        break;
      case 400:
        pushMessage(response.data);
        break;
      default:
        break;
    }
    return Promise.reject(error);
  },
);
export default request;
