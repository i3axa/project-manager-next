import type IEmployee from '@/models/IEmployee';
import type IEmployeeRequest from '@/models/requests/IEmployeeRequest';
import EmployeesService, {
  type PatchEmployeeParams,
} from '@/services/EmployeesService';
import type { EmployeesQuery, Id } from '@/types/API';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from '@tanstack/vue-query';
import type { MaybeRef } from '@vueuse/core';

export function useEmployee(queryKey: MaybeRef<[string, Id]>) {
  return useQuery({
    queryKey: queryKey,
    queryFn: async ({ queryKey }) => {
      const response = await EmployeesService.fetchEmployeeById(queryKey[1]);

      return response.data.employee;
    },
  });
}

export function usePatchEmployee(queryKey?: MaybeRef<QueryKey>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: PatchEmployeeParams) => {
      const response = await EmployeesService.patchEmployee(params);

      return response.data.employee;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKey || ['employees', variables.id], data);
    },
  });
}

export function useEmployees(
  queryKey: MaybeRef<[string, EmployeesQuery] | [string]> = ['employees']
) {
  return useQuery({
    queryKey,
    queryFn: async ({ queryKey }) => {
      const employeesResponse = await EmployeesService.fetchEmployees(
        queryKey[1]
      );

      return employeesResponse.data.employees;
    },
    initialData: [],
  });
}

export function useDeleteEmployee(queryKey: QueryKey = ['employees']) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (employeeId: Id) => EmployeesService.deleteEmployee(employeeId),
    onMutate: async (employeeId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousValue = queryClient.getQueryData<IEmployee[]>(queryKey);

      if (!previousValue) {
        return;
      }

      const newValue = previousValue.filter((e) => e._id !== employeeId);

      queryClient.setQueryData(queryKey, newValue);

      return { previousValue };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.previousValue);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

export function useCreateEmployee(queryKey: QueryKey = ['employees']) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IEmployeeRequest) => {
      const response = await EmployeesService.createEmployee(data);

      return response.data.employee;
    },
    onSuccess: (data) => {
      const previousValue = queryClient.getQueryData<IEmployee[]>(queryKey);

      queryClient.setQueryData(queryKey, [...(previousValue || []), data]);
    },
  });
}
