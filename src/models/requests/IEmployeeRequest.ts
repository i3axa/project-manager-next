import type { EmployeeSpeciality, Id } from '@/types/API';

export default interface IEmployeeRequest {
  user: Id;
  project: Id;
  speciality: EmployeeSpeciality;
}
