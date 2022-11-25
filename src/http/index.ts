import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { cacheAdapterEnhancer } from 'axios-extensions';

const defaultConfig = {
  baseURL: import.meta.env.VITE_API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  withCredentials: true,
  adapter: axios.defaults.adapter
    ? cacheAdapterEnhancer(axios.defaults.adapter)
    : undefined,
};

const formConfig = {
  baseURL: import.meta.env.VITE_API_URL + '/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
};

const tokenInterceptor = (config: AxiosRequestConfig) => {
  const authStore = useAuthStore();

  if (config.headers) {
    config.headers.Authorization = `Bearer ${authStore.credentials.token}`;
  }

  return config;
};

const requests = new Map<string, boolean>();

const errorInterceptor = async (error: AxiosError) => {
  const authStore = useAuthStore();
  const originalRequest = error.config;

  if (!originalRequest.url) {
    throw error;
  }

  if (
    error.response?.status == 401 &&
    error.config &&
    !requests.get(originalRequest.url)
  ) {
    requests.set(originalRequest.url, true);

    await authStore.refreshToken();

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
