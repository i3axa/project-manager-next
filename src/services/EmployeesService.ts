import { AuthAPIInstance } from '@/http';
import type IEmployee from '@/models/IEmployee';
import type IEmployeeResponse from '@/models/response/IEmployeeResponse';
import type IEmployeesIdResponse from '@/models/response/IEmployeesIdResponse';
import type { PartialDeep } from 'type-fest';

export default class EmployeesService {
  static async fetchEmployees() {
    const url = '/employees';

    return AuthAPIInstance.get<IEmployeesIdResponse>(url);
  }

  static async fetchEmployeeById(employeeId: string) {
    const url = `/employees/${employeeId}`;

    return AuthAPIInstance.get<IEmployeeResponse>(url);
  }

  static async putEmployee(employeeId: string, data: PartialDeep<IEmployee>) {
    const url = `/employees/${employeeId}`;

    return AuthAPIInstance.put<IEmployeeResponse>(url, data);
  }
}
