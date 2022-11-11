import { DefaultAPIInstance, AuthAPIInstance } from '@/http';
import type IAuthResponse from '@/models/response/IAuthResponse';
import type { Role } from '@/types/API';

export interface ILoginParameters {
  email: string;
  password: string;
}

export interface IRegistrationParameters {
  email: string;
  password: string;
  role: Role;
  name: string;
  surname: string;
  skills: string;
}

export default class AuthService {
  static async login(payload: ILoginParameters) {
    const url = '/auth/login';

    return DefaultAPIInstance.post<IAuthResponse>(url, payload);
  }

  static async register(payload: IRegistrationParameters) {
    const url = '/auth/registration';

    return DefaultAPIInstance.post<IAuthResponse>(url, payload);
  }

  static async refreshToken() {
    const url = '/refresh';

    return DefaultAPIInstance.get<IAuthResponse>(url);
  }

  static async logout() {
    const url = '/logout';

    return AuthAPIInstance.post(url);
  }
}
