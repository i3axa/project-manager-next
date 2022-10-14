import type IEmployee from '@/models/IEmployee';
import type ITask from '@/models/ITask';
import EmployeesService from '@/services/EmployeesService';
import TaskService from '@/services/TaskService';
import UserService from '@/services/UserService';
import { useStyleStore } from '@/store/style';
import type { EmployeesQuery } from '@/types/API';
import { EmployeesConverter } from '@/types/API/ResponseToModelConverter';
import { onMounted, ref } from 'vue';

export default function (query?: EmployeesQuery) {
  const isLoading = ref(true);
  const employees = ref<IEmployee[]>([]);

  onMounted(async () => {
    const employeesResponse = await EmployeesService.fetchEmployees(query);

    employees.value = await EmployeesConverter.getEmployeesFromIds(
      employeesResponse
    );

    isLoading.value = false;
  });

  return { employees, isLoading };
}
