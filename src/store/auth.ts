import { AxiosError, type AxiosResponse } from 'axios';
import AuthService, {
  type ILoginParameters,
  type IRegistrationParameters,
} from '@/services/AuthService';
import type IValidationErrorResponse from '@/models/response/IValidationErrorResponse';
import { defineStore } from 'pinia';
import type IAuthResponse from '@/models/response/IAuthResponse';
import { readonly, ref } from 'vue';

interface IUserData {
  id: string;
  roles: string[];
  isActivated: boolean;
}

interface ICredentials {
  token?: string;
  user?: IUserData;
}

export const useAuthStore = defineStore('auth', () => {
  const userData = localStorage.getItem('user');

  const isAuth = ref(localStorage.getItem('token') !== null);
  const credentials = ref<ICredentials>({
    token: localStorage.getItem('token') || undefined,
    user: userData ? JSON.parse(userData) : undefined,
  });

  const setToken = (token: string) => {
    credentials.value.token = token;
    localStorage.setItem('token', token);
  };

  const deleteToken = () => {
    credentials.value.token = undefined;
    localStorage.removeItem('token');
  };
  const setUser = (user: IUserData) => {
    credentials.value.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  };

  const deleteUser = () => {
    credentials.value.user = undefined;
    localStorage.removeItem('user');
  };

  const login = async (
    payload: ILoginParameters
  ): Promise<
    | AxiosResponse<IAuthResponse>
    | AxiosError<IValidationErrorResponse | unknown>
  > => {
    try {
      const response = await AuthService.login(payload);

      setToken(response.data.accessToken);
      setUser(response.data.user);
      isAuth.value = true;

      localStorage.removeItem('currentProject');

      return response;
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof AxiosError<IValidationErrorResponse>) {
        return error as AxiosError<IValidationErrorResponse>;
      }

      return error as AxiosError;
    }
  };

  const register = async (
    payload: IRegistrationParameters
  ): Promise<
    | AxiosResponse<IAuthResponse>
    | AxiosError<IValidationErrorResponse | unknown>
  > => {
    try {
      const response = await AuthService.register(payload);

      setToken(response.data.accessToken);
      setUser(response.data.user);
      isAuth.value = true;

      return response;
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof AxiosError<IValidationErrorResponse>) {
        return error as AxiosError<IValidationErrorResponse>;
      }

      return error as AxiosError;
    }
  };

  const logout = async () => {
    try {
      const response = await AuthService.logout();

      isAuth.value = false;
      deleteToken();
      deleteUser();

      localStorage.removeItem('currentProject');

      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }
    }
  };

  const refreshToken = async () => {
    try {
      const response = await AuthService.refreshToken();

      console.log(response);

      setToken(response.data.accessToken);
      setUser(response.data.user);
      isAuth.value = true;

      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response);

        location.assign('/auth');
      }
    }
  };

  return {
    isAuth: readonly(isAuth),
    credentials: readonly(credentials),
    login,
    logout,
    register,
    refreshToken,
  };
});
