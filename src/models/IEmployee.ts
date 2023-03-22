import type IUserDto from './dto/IUserDto';
import type { EmployeeSpeciality, Id } from '@/types/API';
import type IProject from './IProject';

export default interface IEmployee {
  _id: Id;
  user: IUserDto;
  project: IProject;
  speciality: EmployeeSpeciality;
}
