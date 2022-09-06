import type { Role } from '@/types/Authorization';

export default interface IAuthResponse {
  accessToken: string;
  user: {
    id: string;
    project: string;
    isActivated: boolean;
    roles: Role[];
  };
}
