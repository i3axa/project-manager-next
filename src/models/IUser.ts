import type { Id, Role } from '@/types/API';

export default interface IUser {
  _id: Id;
  email: string;
  password?: string;
  name: string;
  surname?: string;
  skills?: string;
  roles: Role[];
  isActivated?: boolean;
  activationLink?: string;
}
