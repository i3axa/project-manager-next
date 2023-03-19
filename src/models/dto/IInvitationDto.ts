import type { EmployeeSpeciality, Id } from '@/types/API';

export interface IInvitationDto {
  _id: Id;
  user: Id;
  project: Id;
  isResolved: boolean;
  speciality: EmployeeSpeciality;
}
