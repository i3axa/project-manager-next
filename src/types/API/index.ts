import type IEmployee from '@/models/IEmployee';
import type IProject from '@/models/IProject';
import type ITask from '@/models/ITask';

export * from './ResponseToModelConverter';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum EmployeeSpeciality {
  MANAGER = 'MANAGER',
  EXECUTOR = 'EXECUTOR',
}

export enum TaskState {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  STOPED = 'STOPED',
  CLOSED = 'CLOSED',
}

export type Id = string;

interface IQueryParams {
  _limit: number;
  _page: number;
}

interface IEmployeesQueryParams extends IQueryParams {
  projects: Id[];
}

interface ITasksQueryParams extends IQueryParams {
  projects: Id[];
  isFree: '1' | '0';
}

interface IProjectsQueryParams extends IQueryParams {
  isPrivate: '1' | '0';
}

export type TasksQuery = Partial<ITasksQueryParams | ITask>;
export type EmployeesQuery = Partial<IEmployeesQueryParams | IEmployee>;
export type ProjectsQuery = Partial<
  IProjectsQueryParams | Omit<IProject, 'isPrivate'>
>;
