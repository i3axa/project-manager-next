import type IEmployee from '@/models/IEmployee';
import EmployeesService from '@/services/EmployeesService';
import { useStyleStore } from '@/store/style';
import { onMounted, ref, watch } from 'vue';

export default function () {
  const isLoading = ref(true);
  const employees = ref<IEmployee[]>([]);
  const styleStore = useStyleStore();

  const updateTasks = async (employee: IEmployee) => {
    const tasksIds = employee.takenTasks.map((task) => task._id);

    styleStore.setIsSyncIndicatorToggled(true);

    await EmployeesService.patchEmployee(employee.id, { takenTasks: tasksIds });

    styleStore.setIsSyncIndicatorToggled(false);
  };

  onMounted(async () => {
    const employeesResponse = await EmployeesService.fetchEmployees();

    for (const id of employeesResponse.data.employees) {
      const response = await EmployeesService.fetchEmployeeById(id);

      employees.value.push(response.data.employee);
    }

    isLoading.value = false;

    employees.value.forEach((employee) => {
      watch(employee, () => updateTasks(employee), { deep: true });
    });
  });

  return { employees, isLoading, updateTasks };
}
