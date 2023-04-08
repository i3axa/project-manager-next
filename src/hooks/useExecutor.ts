import { computed, type Ref } from 'vue';
import {
  EmployeeSpeciality,
  type EmployeesQuery,
  type Id,
  type TasksQuery,
} from '@/types/API';
import { useEmployees, useTasks } from '@/api';
import { until } from '@vueuse/core';

export default function (userId: Id, currentProject: Ref<Id | undefined>) {
  const employeesQueryKey = computed<[string, EmployeesQuery]>(() => [
    'employees',
    { speciality: EmployeeSpeciality.EXECUTOR, user: userId },
  ]);
  const { data: employees, isFetchedAfterMount: isEmployeesFetched } =
    useEmployees(employeesQueryKey);

  const currentEmployee = computed(() =>
    currentProject.value
      ? employees.value.find((e) => e.project._id === currentProject.value)
      : employees.value[0]
  );
  const projects = computed(() => employees.value.map((e) => e.project));

  const tasksQueryKey = computed<[string, TasksQuery]>(() => [
    'tasks',
    { employee: currentEmployee.value?._id },
  ]);
  const enabled = computed(
    () => !!(currentEmployee.value && currentProject.value)
  );
  const { data: tasks, isFetchedAfterMount: isTasksFetched } = useTasks(
    tasksQueryKey,
    {
      enabled,
    }
  );

  const isLoading = computed(
    () => !(isEmployeesFetched.value || isTasksFetched.value)
  );

  (async () => {
    await until(projects).toMatch((v) => v.length > 0);

    if (!currentProject.value) {
      currentProject.value = projects.value[0]._id;
    }
  })();

  return { tasks, projects, executors: employees, currentEmployee, isLoading };
}
