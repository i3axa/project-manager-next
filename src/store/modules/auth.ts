import type { State } from '..';
import type { Module } from 'vuex';
import { AxiosError } from 'axios';
import AuthService, {
  type ILoginParameters,
  type IRegistrationParameters,
} from '@/services/AuthService';

interface IUserData {
  id: string;
  project: string;
  roles: string[];
  isActivated: boolean;
}

export interface AuthState {
  isAuth: boolean;
  credentials: {
    token?: string;
    user?: IUserData;
  };
}

export enum AuthActions {
  login = 'auth/login',
  register = 'auth/register',
  logout = 'auth/logout',
  refreshToken = 'auth/refreshToken',
}

export enum AuthMutations {
  setToken = 'setToken',
  setUser = 'setUser',
  setIsAuth = 'setIsAuth',
  deleteToken = 'deleteToken',
  deleteUser = 'deleteUser',
}

export const authModule: Module<AuthState, State> = {
  namespaced: true,

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

  mutations: {
    setToken(state, token: string) {
      state.credentials.token = token;
      localStorage.setItem('token', token);
    },
    deleteToken(state) {
      state.credentials.token = undefined;
      localStorage.removeItem('token');
    },
    setUser(state, user: IUserData) {
      state.credentials.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    deleteUser(state) {
      state.credentials.user = undefined;
      localStorage.removeItem('user');
    },
    setIsAuth(state, isAuth: boolean) {
      state.isAuth = isAuth;
    },
  },

  actions: {
    async login({ commit }, payload: ILoginParameters) {
      try {
        const response = await AuthService.login(payload);

        commit(AuthMutations.setToken, response.data.accessToken);
        commit(AuthMutations.setUser, response.data.user);
        commit(AuthMutations.setIsAuth, true);

        return response;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log(error.response);
          return error;
        }
      }
    },
    async register({ commit }, payload: IRegistrationParameters) {
      try {
        const response = await AuthService.register(payload);

        console.log(response);

        commit(AuthMutations.setToken, response.data.accessToken);
        commit(AuthMutations.setUser, response.data.user);
        commit(AuthMutations.setIsAuth, true);

        return response;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log(error.response);
          return error;
        }
      }
    },
    async logout({ commit }) {
      try {
        const response = await AuthService.logout();

        console.log(response);

        commit(AuthMutations.setIsAuth, false);
        commit(AuthMutations.deleteToken);
        commit(AuthMutations.deleteUser);

        return response;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log(error.response);
        }
      }
    },
    async refreshToken({ commit }) {
      try {
        const response = await AuthService.refreshToken();

        console.log(response);

        commit(AuthMutations.setToken, response.data.accessToken);
        commit(AuthMutations.setUser, response.data.user);
        commit(AuthMutations.setIsAuth, true);

        return response;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log(error.response);
        }
      }
    },
  },
};
