import type ITask from './ITask';

export default interface IEmployee {
  id: string;
  user: string;
  name: string;
  surname: string;
  email: string;
  skills: string;
  takenTasks: ITask[];
}
