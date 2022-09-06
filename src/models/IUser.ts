export default interface IUser {
  email: string;
  password: string;
  name: string;
  surname?: string;
  skills?: string;
  roles: string[];
  isActivated?: boolean;
  activationLink?: string;
  project: string;
}
