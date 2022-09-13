import { AuthAPIInstance } from '@/http';
import type IUserResponse from '@/models/response/IUserResponse';

export default class UserService {
  static async getUser(id: string) {
    const url = `/user/${id}`;

    return AuthAPIInstance.get<IUserResponse>(url);
  }
}
