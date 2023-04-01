import type { TaskState } from '../../types/API';
import type { ITaskInStateColumn } from './ITaskInStateColumn';

export interface IStateColumn {
  title: string;
  state: TaskState;
  totalDifficulty: number;
  tasks: ITaskInStateColumn[];
}
