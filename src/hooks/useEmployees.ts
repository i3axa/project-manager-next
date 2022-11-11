import type IEmployee from '@/models/IEmployee';
import EmployeesService from '@/services/EmployeesService';
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
