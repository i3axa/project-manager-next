import type { EmployeeSpeciality, Id } from '@/types/API';

export default interface IEmployeeDto {
  _id: Id;
  user: Id;
  project: Id;
  speciality: EmployeeSpeciality;
}
