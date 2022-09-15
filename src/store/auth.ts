import { AxiosError, type AxiosResponse } from 'axios';
import AuthService, {
  type ILoginParameters,
  type IRegistrationParameters,
} from '@/services/AuthService';
import type IValidationErrorResponse from '@/models/response/IValidationErrorResponse';
import { defineStore } from 'pinia';
import type IAuthResponse from '@/models/response/IAuthResponse';

interface IUserData {
  id: string;
  project: string;
  roles: string[];
  isActivated: boolean;
}

interface AuthState {
  isAuth: boolean;
  credentials: {
    token?: string;
    user?: IUserData;
  };
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return {
      isAuth: localStorage.getItem('token') !== null,
      credentials: {
        token: localStorage.getItem('token') || undefined,
        user: localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user')!)
          : undefined,
      },
    };
  },
  actions: {
    setToken(token: string) {
      this.credentials.token = token;
      localStorage.setItem('token', token);
    },
    deleteToken() {
      this.credentials.token = undefined;
      localStorage.removeItem('token');
    },
    setUser(user: IUserData) {
      this.credentials.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    deleteUser() {
      this.credentials.user = undefined;
      localStorage.removeItem('user');
    },
    setIsAuth(isAuth: boolean) {
      this.isAuth = isAuth;
    },
    async login(
      payload: ILoginParameters
    ): Promise<
      | AxiosResponse<IAuthResponse>
      | AxiosError<IValidationErrorResponse | unknown>
    > {
      try {
        const response = await AuthService.login(payload);

        this.setToken(response.data.accessToken);
        this.setUser(response.data.user);
        this.isAuth = true;

        return response;
      } catch (error: unknown) {
        console.log(error);

        if (error instanceof AxiosError<IValidationErrorResponse>) {
          return error as AxiosError<IValidationErrorResponse>;
        }

        return error as AxiosError;
      }
    },
    async register(payload: IRegistrationParameters) {
      try {
        const response = await AuthService.register(payload);

        this.setToken(response.data.accessToken);
        this.setUser(response.data.user);
        this.isAuth = true;

        return response;
      } catch (error: unknown) {
        console.log(error);

        if (error instanceof AxiosError<IValidationErrorResponse>) {
          return error as AxiosError<IValidationErrorResponse>;
        }

        return error as AxiosError;
      }
    },
    async logout() {
      try {
        const response = await AuthService.logout();

        this.isAuth = false;
        this.deleteToken();
        this.deleteUser();

        return response;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log(error.response);
        }
      }
    },
    async refreshToken() {
      try {
        const response = await AuthService.refreshToken();

        console.log(response);

        this.setToken(response.data.accessToken);
        this.setUser(response.data.user);
        this.isAuth = true;

        return response;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log(error.response);
        }
      }
    },
  },
});
