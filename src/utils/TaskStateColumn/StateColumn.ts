import type { TaskState } from '../../types/API';
import type { ITaskInStateColumn } from './ITaskInStateColumn';
import type { IStateColumn } from './IStateColumn';

export interface IConstructorParams {
  titleLocaleKey: string;
  state: TaskState;
  tasks: ITaskInStateColumn[];
}

export class StateColumn implements IStateColumn {
  constructor({ titleLocaleKey, state, tasks }: IConstructorParams) {
    this.titleLocaleKey = titleLocaleKey;
    this.state = state;
    this.tasks = tasks;
  }

  public get totalDifficulty(): number {
    const difficulties = this.tasks.map((task) => task.task.difficulty);

    return difficulties.reduce((previous, current) => previous + current, 0);
  }

  public readonly titleLocaleKey: string;
  public readonly state: TaskState;

  public readonly tasks: ITaskInStateColumn[];
}
