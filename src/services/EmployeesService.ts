import { AuthAPIInstance } from '@/http';
import type IEmployeeDto from '@/models/dto/IEmployeeDto';
import type IEmployeeResponse from '@/models/response/IEmployeeResponse';
import type IEmployeesIdResponse from '@/models/response/IEmployeesIdResponse';

export default class EmployeesService {
  static async fetchEmployees() {
    const url = '/employees';

    return AuthAPIInstance.get<IEmployeesIdResponse>(url);
  }

  static async fetchEmployeeById(employeeId: string) {
    const url = `/employees/${employeeId}`;

    return AuthAPIInstance.get<IEmployeeResponse>(url);
  }

  static async patchEmployee(employeeId: string, data: Partial<IEmployeeDto>) {
    const url = `/employees/${employeeId}`;

    return AuthAPIInstance.patch<IEmployeeResponse>(url, data);
  }
}
