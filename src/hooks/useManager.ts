import type IEmployee from '@/models/IEmployee';
import type IProject from '@/models/IProject';
import EmployeesService from '@/services/EmployeesService';
import ProjectService from '@/services/ProjectService';
import { EmployeeSpeciality, type Id } from '@/types/API';
import { EmployeesConverter } from '@/types/API/ResponseToModelConverter';
import { onMounted, readonly, ref, watch, type Ref } from 'vue';

export default function (userId: Id, currentProject: Ref<Id | undefined>) {
  const isLoading = ref(true);
  const executors = ref<IEmployee[]>([]);
  const projects = ref<IProject[]>([]);
  const manager = ref<IEmployee>();

  const getProjectsIds = async () => {
    const userEmployeesResponse = await EmployeesService.fetchEmployees({
      user: userId,
      speciality: EmployeeSpeciality.MANAGER,
    });

    if (userEmployeesResponse.data.employees.length === 0) {
      return [];
    }

    const userEmployees = await EmployeesConverter.getEmployeesFromIds(
      userEmployeesResponse
    );

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

    const managerResponse = await EmployeesService.fetchEmployeeById(
      employeesResponse.data.employees[0]
    );

    return await EmployeesConverter.getEmployee(managerResponse);
  };

  const fetch = async () => {
    const projectIds = await getProjectsIds();

    executors.value = [];

    for (const id of projectIds) {
      const employeesResponse = await EmployeesService.fetchEmployees({
        speciality: EmployeeSpeciality.EXECUTOR,
        project: id,
      });

      const employees = await EmployeesConverter.getEmployeesFromIds(
        employeesResponse
      );

      executors.value.push(...employees);
    }

    projects.value = [];

    for (const id of projectIds) {
      const response = await ProjectService.fetchProjectById(id);
      projects.value.push(response.data.project);
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
