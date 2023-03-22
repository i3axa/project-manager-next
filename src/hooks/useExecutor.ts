import { onMounted, ref, watch, type Ref } from 'vue';
import EmployeesService from '@/services/EmployeesService';
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
      employees.value = [];
    }

    employees.value = employeesResponse.data.employees;
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

    tasks.value = tasksResponse.data.tasks;
  };

  onMounted(async () => {
    await fetchEmployees();

    if (employees.value.length === 0) {
      isLoading.value = false;
      return;
    }

    if (currentProject.value) {
      currentEmployee.value = employees.value.find(
        (e) => e.project._id === currentProject.value
      );
    } else {
      currentEmployee.value = employees.value[0];
    }

    await fetchProjects(employees.value.map((e) => e.project._id));
    currentProject.value = currentProject.value ?? projects.value[0]._id;

    await fetchTasks();

    isLoading.value = false;
  });

  watch(currentProject, async () => {
    isLoading.value = true;

    currentEmployee.value = employees.value.find(
      (e) => e.project._id === currentProject.value
    );

    await fetchTasks();

    isLoading.value = false;
  });

  return { tasks, projects, currentEmployee, isLoading };
}
