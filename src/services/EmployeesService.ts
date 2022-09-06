import { AuthAPIInstance } from '@/http';
import type IEmployee from '@/models/IEmployee';
import type IEmployeeResponse from '@/models/response/IEmployeeResponse';
import type IEmployeesResponse from '@/models/response/IEmployeesResponse';
import type { PartialDeep } from 'type-fest';

export default class EmployeesService {
  static async fetchEmployees() {
    const url = '/employees';

    return AuthAPIInstance.get<IEmployeesResponse>(url);
  }

  static async fetchEmployee(employeeUserId: string) {
    const url = `/employees/${employeeUserId}`;

    return AuthAPIInstance.get<IEmployeeResponse>(url);
  }

  static async putEmployee(employeeId: string, data: PartialDeep<IEmployee>) {
    const url = `/employees/${employeeId}`;

    return AuthAPIInstance.put(url, data);
  }
}
