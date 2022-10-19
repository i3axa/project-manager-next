import { onMounted, ref, watch, type Ref } from 'vue';
import EmployeesService from '@/services/EmployeesService';
import {
  EmployeesConverter,
  TasksConverter,
} from '@/types/API/ResponseToModelConverter';
import { EmployeeSpeciality, type Id } from '@/types/API';
import type IProject from '@/models/IProject';
import type IEmployee from '@/models/IEmployee';
import type ITask from '@/models/ITask';
import ProjectService from '@/services/ProjectService';
import TaskService from '@/services/TaskService';

export default function (userId: Id, currentProject: Ref<Id | undefined>) {
  const tasks = ref<ITask[]>([]);
  const currentEmployee = ref<IEmployee>();
  const projects = ref<IProject[]>([]);
  const isLoading = ref(true);

  const employees = ref<IEmployee[]>([]);

  const fetchEmployees = async () => {
    const employeesResponse = await EmployeesService.fetchEmployees({
      user: userId,
      speciality: EmployeeSpeciality.EXECUTOR,
    });

    if (employeesResponse.data.employees.length === 0) {
      throw new Error('There is no projects');
    }

    employees.value = await EmployeesConverter.getEmployeesFromIds(
      employeesResponse
    );
  };

  const fetchProjects = async (ids: Id[]) => {
    projects.value = [];

    for (const id of ids) {
      const response = await ProjectService.fetchProjectById(id);

      projects.value.push(response.data.project);
    }
  };

  const fetchTasks = async () => {
    if (
      currentProject.value === undefined ||
      currentEmployee.value === undefined
    ) {
      return;
    }

    tasks.value = [];

    const tasksResponse = await TaskService.fetchTasks({
      employee: currentEmployee.value._id,
      project: currentProject.value,
    });

    tasks.value = await TasksConverter.getTasksFromIds(tasksResponse);

    isLoading.value = false;
  };

  onMounted(async () => {
    await fetchEmployees();
    currentEmployee.value = employees.value[0];

    await fetchProjects(employees.value.map((e) => e.project));

    currentProject.value = projects.value[0]._id;

    await fetchTasks();
  });

  watch(currentProject, async () => {
    isLoading.value = true;

    currentEmployee.value = employees.value.find(
      (e) => e.project === currentProject.value
    );

    await fetchTasks();
  });

  return { tasks, projects, currentEmployee, isLoading };
}
