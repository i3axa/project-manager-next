import { AuthAPIInstance } from '@/http';
import type IEmployeeRequest from '@/models/requests/IEmployeeRequest';
import type IEmployeeResponse from '@/models/response/IEmployeeResponse';
import type IEmployeesManyResponse from '@/models/response/IEmployeesManyResponse';
import type { EmployeesQuery, Id } from '@/types/API';

export interface PatchEmployeeParams {
  id: Id;
  data: Partial<IEmployeeRequest>;
}

export default class EmployeesService {
  static async fetchEmployees(query?: EmployeesQuery) {
    const url = '/employees';

    return AuthAPIInstance.get<IEmployeesManyResponse>(url, { params: query });
  }

  static async fetchEmployeeById(employeeId: Id) {
    const url = `/employees/${employeeId}`;

    return AuthAPIInstance.get<IEmployeeResponse>(url);
  }

  static async patchEmployee({ id, data }: PatchEmployeeParams) {
    const url = `/employees/${id}`;

    return AuthAPIInstance.patch<IEmployeeResponse>(url, data);
  }

  static async createEmployee(data: Omit<IEmployeeRequest, 'user'>) {
    const url = `/employees`;

    return AuthAPIInstance.post<IEmployeeResponse>(url, data);
  }

  static async deleteEmployee(employeeId: Id) {
    const url = `/employees/${employeeId}`;

    return AuthAPIInstance.delete<IEmployeeResponse>(url);
  }
}
