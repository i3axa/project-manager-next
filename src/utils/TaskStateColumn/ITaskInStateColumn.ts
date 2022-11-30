import type IUserDto from '@/models/dto/IUserDto';
import type ITask from '@/models/ITask';

export interface ITaskInStateColumn {
  toggleInfo(): void;

  startIncrementProgress(): void;
  stopIncrementProgress(): void;

  startIncrementUsedHours(): void;
  stopIncrementUsedHours(): void;

  startDecrementProgress(): void;
  stopDecrementProgress(): void;

  startDecrementUsedHours(): void;
  stopDecrementUsedHours(): void;

  get days(): number;
  get hours(): number;
  get infoToggled(): boolean;
  get taskDirector(): IUserDto | undefined;

  readonly task: ITask;
}
