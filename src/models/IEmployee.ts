import type ITask from './ITask';

export default interface IEmployee {
  id: string;
  name: string;
  surname: string;
  email: string;
  skills: string;
  takenTasks: ITask[];
}
