import { AuthAPIInstance } from '@/http';
import type IUserResponse from '@/models/response/IUserResponse';
import type { Id } from '@/types/API';

export default class UserService {
  static async getUser(id: Id) {
    const url = `/user/${id}`;

    return AuthAPIInstance.get<IUserResponse>(url);
  }
}
