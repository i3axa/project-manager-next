import type { Id, TaskState } from '@/types/API';
import type IEmployee from './IEmployee';

export default interface ITask {
  _id: Id;
  title: string;
  difficulty: number;
  description: string;
  attachments: string[];
  progress: number;
  startTime: string;
  deadline: string;
  state: TaskState;
  usedHours: number;
  director: Id;
  employee: Id | null;
  project: Id;
}
