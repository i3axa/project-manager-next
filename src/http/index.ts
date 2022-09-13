import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import store from '@/store';
import { AuthActions } from '@/store/modules/auth';
import { useRouter } from 'vue-router';

const defaultConfig = {
  baseURL: import.meta.env.VITE_API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const formConfig = {
  baseURL: import.meta.env.VITE_API_URL + '/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
};

const tokenInterceptor = (config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${store.state.auth.credentials.token}`;
  }

  return config;
};

const requests = new Map<string, boolean>();

const errorInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config;

  if (
    error.response?.status == 401 &&
    error.config &&
    !requests.get(originalRequest.url!)
  ) {
    requests.set(originalRequest.url!, true);

    await store.dispatch(AuthActions.refreshToken);

    const response = await AuthAPIInstance.request(originalRequest);

    requests.clear();

    return response;
  }

  requests.clear();

  throw error;
};

export const DefaultAPIInstance = axios.create(defaultConfig);
export const AuthAPIInstance = axios.create(defaultConfig);
export const FormAuthAPIInstance = axios.create(formConfig);

AuthAPIInstance.interceptors.request.use(tokenInterceptor);
AuthAPIInstance.interceptors.response.use((config) => config, errorInterceptor);

FormAuthAPIInstance.interceptors.request.use(tokenInterceptor);
FormAuthAPIInstance.interceptors.response.use(
  (config) => config,
  errorInterceptor
);
