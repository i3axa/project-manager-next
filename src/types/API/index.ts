import type IEmployeeDto from '@/models/dto/IEmployeeDto';
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

type StringifiedBoolean = '1' | '0';

interface ITasksQueryParams extends IQueryParams {
  isFree: StringifiedBoolean;
}

interface IProjectsQueryParams extends IQueryParams {
  isPrivate: StringifiedBoolean;
}

export type TasksQuery = Partial<ITasksQueryParams | ITask>;
export type EmployeesQuery = Partial<IQueryParams | IEmployeeDto>;
export type ProjectsQuery = Partial<
  IProjectsQueryParams | Omit<IProject, 'isPrivate'>
>;
