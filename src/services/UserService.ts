import { AuthAPIInstance } from '@/http';
import type IUser from '@/models/IUser';
import type IUserResponse from '@/models/response/IUserResponse';
import type IUsersManyResponse from '@/models/response/IUsersManyResponse';
import type { Id, UsersQuery } from '@/types/API';

export type PatchUserParams = Pick<IUser, 'name' | 'surname' | 'skills'>;
export interface PutPasswordParams {
  oldPassword: string;
  newPassword: string;
}

export default class UserService {
  static async getUser(id: Id) {
    const url = `/users/${id}`;

    return AuthAPIInstance.get<IUserResponse>(url);
  }

  static async getUsers(query?: UsersQuery) {
    const url = '/users';

    return AuthAPIInstance.get<IUsersManyResponse>(url, { params: query });
  }

  static async patchUser(data: PatchUserParams) {
    const url = `/user`;

    return AuthAPIInstance.patch<IUserResponse>(url, data);
  }

  static async putPassword(data: PutPasswordParams) {
    const url = `/password`;

    return AuthAPIInstance.put(url, data);
  }
}
