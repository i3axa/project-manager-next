import type IEmployee from '@/models/IEmployee';
import type IProject from '@/models/IProject';
import EmployeesService from '@/services/EmployeesService';
import { EmployeeSpeciality, type Id } from '@/types/API';
import { onMounted, readonly, ref, watch, type Ref } from 'vue';

export default function (userId: Id, currentProject: Ref<Id | undefined>) {
  const isLoading = ref(true);
  const executors = ref<IEmployee[]>([]);
  const projects = ref<IProject[]>([]);
  const manager = ref<IEmployee>();

  const getProjects = async () => {
    const userEmployeesResponse = await EmployeesService.fetchEmployees({
      user: userId,
      speciality: EmployeeSpeciality.MANAGER,
    });

    if (userEmployeesResponse.data.employees.length === 0) {
      return [];
    }

    const userEmployees = userEmployeesResponse.data.employees;

    return userEmployees.map((e) => e.project);
  };

  const getManager = async (projectId: Id) => {
    const employeesResponse = await EmployeesService.fetchEmployees({
      user: userId,
      project: projectId,
      speciality: EmployeeSpeciality.MANAGER,
    });

    if (employeesResponse.data.employees.length === 0) {
      return undefined;
    }

    return employeesResponse.data.employees[0];
  };

  const fetch = async () => {
    projects.value = await getProjects();

    executors.value = [];

    for (const id of projects.value.map((p) => p._id)) {
      const employeesResponse = await EmployeesService.fetchEmployees({
        speciality: EmployeeSpeciality.EXECUTOR,
        project: id,
      });

      const employees = employeesResponse.data.employees;

      executors.value.push(...employees);
    }
  };

  onMounted(async () => {
    await fetch();

    if (projects.value.length > 0) {
      currentProject.value = currentProject.value ?? projects.value[0]._id;
      manager.value = await getManager(currentProject.value);
    }

    isLoading.value = false;
  });

  watch(currentProject, async () => {
    isLoading.value = true;

    await fetch();

    if (currentProject.value) {
      manager.value = await getManager(currentProject.value);
    }

    isLoading.value = false;
  });

  return { executors, projects, isLoading, manager: readonly(manager) };
}
