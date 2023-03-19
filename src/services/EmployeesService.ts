import { AuthAPIInstance } from '@/http';
import type IEmployeeDto from '@/models/dto/IEmployeeDto';
import type IEmployeeResponse from '@/models/response/IEmployeeResponse';
import type IEmployeesIdResponse from '@/models/response/IEmployeesIdResponse';
import type { EmployeesQuery, Id } from '@/types/API';

export default class EmployeesService {
  static async fetchEmployees(query?: EmployeesQuery) {
    const url = '/employees';

    return AuthAPIInstance.get<IEmployeesIdResponse>(url, { params: query });
  }

  static async fetchEmployeeById(employeeId: Id) {
    const url = `/employees/${employeeId}`;

    return AuthAPIInstance.get<IEmployeeResponse>(url);
  }

  static async patchEmployee(employeeId: Id, data: Partial<IEmployeeDto>) {
    const url = `/employees/${employeeId}`;

    return AuthAPIInstance.patch<IEmployeeResponse>(url, data);
  }

  static async deleteEmployee(employeeId: Id) {
    const url = `/employees/${employeeId}`;

    return AuthAPIInstance.delete<IEmployeeResponse>(url);
  }
}
