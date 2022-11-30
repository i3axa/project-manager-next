import type IEmployee from '@/models/IEmployee';
import type IEmployeeResponse from '@/models/response/IEmployeeResponse';
import type IEmployeesIdResponse from '@/models/response/IEmployeesIdResponse';
import EmployeesService from '@/services/EmployeesService';
import UserService from '@/services/UserService';
import type { AxiosResponse } from 'axios';

export async function getEmployee(response: AxiosResponse<IEmployeeResponse>) {
  const employeeDto = response.data.employee;

  const userResponse = await UserService.getUser(employeeDto.user);
  const user = userResponse.data.user;

  return {
    ...employeeDto,
    user,
  } as IEmployee;
}

export async function getEmployeesFromIds(
  response: AxiosResponse<IEmployeesIdResponse>
) {
  const ids = response.data.employees;

  const employees: IEmployee[] = [];

  for (const id of ids) {
    const employeeResponse = await EmployeesService.fetchEmployeeById(id);

    employees.push(await getEmployee(employeeResponse));
  }

  return employees;
}

export default { getEmployee, getEmployeesFromIds };
