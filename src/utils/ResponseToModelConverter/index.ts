import Employees from './Employees';
import Invitations from './Invitations';
import Projects from './Projects';
import Tasks from './Tasks';

export const EmployeesConverter = Employees;
export const TasksConverter = Tasks;
export const ProjectsConverter = Projects;
export const InvitationsConverter = Invitations;

export default {
  employees: Employees,
  tasks: Tasks,
  projects: Projects,
};
