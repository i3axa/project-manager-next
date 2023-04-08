import { useEmployees } from '@/api';
import EmployeesService from '@/services/EmployeesService';
import { EmployeeSpeciality, type EmployeesQuery, type Id } from '@/types/API';
import { useQuery } from '@tanstack/vue-query';
import { computed, readonly, type Ref } from 'vue';

export default function (userId: Id, currentProject: Ref<Id | undefined>) {
  const executorsQueryKey = computed<[string, EmployeesQuery]>(() => [
    'employees',
    { speciality: EmployeeSpeciality.EXECUTOR, project: currentProject.value },
  ]);
  const { data: executors, isFetchedAfterMount: isExecutorsFetched } =
    useEmployees(executorsQueryKey);

  const { data: projects, isFetchedAfterMount: isProjectsFetched } = useQuery({
    queryKey: ['projects', { userId }],
    queryFn: async () => {
      const userEmployeesResponse = await EmployeesService.fetchEmployees({
        user: userId,
        speciality: EmployeeSpeciality.MANAGER,
      });

      if (userEmployeesResponse.data.employees.length === 0) {
        return [];
      }

      const userEmployees = userEmployeesResponse.data.employees;

      const result = userEmployees.map((e) => e.project);

      if (!currentProject.value) {
        currentProject.value = result[0]._id;
      }

      return result;
    },
  });

  const managerQueryKey = computed(() => ['manager', currentProject.value]);
  const isEnabled = computed(() => !!currentProject.value);
  const { data: manager, isFetchedAfterMount: isManagerFetched } = useQuery({
    enabled: isEnabled,
    queryKey: managerQueryKey,
    queryFn: async ({ queryKey }) => {
      const employeesResponse = await EmployeesService.fetchEmployees({
        user: userId,
        project: queryKey[1],
        speciality: EmployeeSpeciality.MANAGER,
      });

      if (employeesResponse.data.employees.length === 0) {
        return undefined;
      }

      return employeesResponse.data.employees[0];
    },
  });

  const isLoading = computed(
    () =>
      !(
        isExecutorsFetched.value ||
        isProjectsFetched.value ||
        isManagerFetched.value
      )
  );

  return { executors, projects, isLoading, manager: readonly(manager) };
}
