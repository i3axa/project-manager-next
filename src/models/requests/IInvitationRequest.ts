import type { EmployeeSpeciality, Id } from '@/types/API';

export interface IInvitationRequest {
  user: Id;
  project: Id;
  isResolved: boolean;
  speciality: EmployeeSpeciality;
}
