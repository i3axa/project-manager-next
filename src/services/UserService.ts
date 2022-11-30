import { AuthAPIInstance } from '@/http';
import type IUserResponse from '@/models/response/IUserResponse';
import type IUsersManyResponse from '@/models/response/IUsersManyResponse';
import type { Id, UsersQuery } from '@/types/API';

export default class UserService {
  static async getUser(id: Id) {
    const url = `/users/${id}`;

    return AuthAPIInstance.get<IUserResponse>(url);
  }

  static async getUsers(query: UsersQuery) {
    const url = '/users';

    return AuthAPIInstance.get<IUsersManyResponse>(url, { params: query });
  }
}
