import { onMounted, ref } from 'vue';
import EmployeesService from '@/services/EmployeesService';
import type IEmployee from '@/models/IEmployee';

export default function useEmployee(employeeId: string) {
  const employee = ref<IEmployee>();
  const isLoading = ref(true);

  onMounted(async () => {
    const response = await EmployeesService.fetchEmployeeById(employeeId);
    employee.value = response.data.employee;
    isLoading.value = false;
  });

  return { employee, isLoading };
}
