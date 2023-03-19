import type { EmployeeSpeciality, Id } from '@/types/API';
import type IUserDto from './dto/IUserDto';
import type IProject from './IProject';

export default interface IInvitation {
  _id: Id;
  user: IUserDto;
  project: IProject;
  isResolved: boolean;
  speciality: EmployeeSpeciality;
}
