import type IUserDto from './dto/IUserDto';
import type IProject from './IProject';
import type { EmployeeSpeciality, Id } from '@/types/API';

export default interface IEmployee {
  _id: Id;
  user: IUserDto;
  project: Id;
  speciality: EmployeeSpeciality;
}
