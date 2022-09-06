import type IEmployee from '@/models/IEmployee';
import EmployeesService from '@/services/EmployeesService';
import store from '@/store';
import { StyleMutations } from '@/store/modules/style';
import { onMounted, ref, watch } from 'vue';

export default function () {
  const isLoading = ref(true);
  const employees = ref<IEmployee[]>([]);

  const updateTasks = async (employee: IEmployee) => {
    const dto = employee.takenTasks.map((task) => {
      return {
        _id: task._id,
        isFree: false,
      };
    });

    store.commit(StyleMutations.setIsSyncIndicatorToggled, true);

    await EmployeesService.putEmployee(employee.id, { takenTasks: dto });

    store.commit(StyleMutations.setIsSyncIndicatorToggled, false);
  };

  onMounted(async () => {
    const employeesResponse = await EmployeesService.fetchEmployees();

    employees.value = employeesResponse.data.employees;

    isLoading.value = false;

    employees.value.forEach((employee) => {
      watch(employee, () => updateTasks(employee), { deep: true });
    });
  });

  return { employees, isLoading, updateTasks };
}
