import type { TaskState } from '../../types/API';
import type { ITaskInStateColumn } from './ITaskInStateColumn';
import type { IStateColumn } from './IStateColumn';

export interface IConstructorParams {
  title: string;
  state: TaskState;
  tasks: ITaskInStateColumn[];
}

export class StateColumn implements IStateColumn {
  constructor({ title, state, tasks }: IConstructorParams) {
    this.title = title;
    this.state = state;
    this.tasks = tasks;
  }

  public get totalDifficulty(): number {
    const difficulties = this.tasks.map((task) => task.task.difficulty);

    return difficulties.reduce((previous, current) => previous + current, 0);
  }

  public readonly title: string;
  public readonly state: TaskState;

  public readonly tasks: ITaskInStateColumn[];
}
