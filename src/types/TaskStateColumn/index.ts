import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import store from '@/store';
import { StyleMutations } from '@/store/modules/style';

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

  readonly task: ITask;
}

export interface ITaskStateColumn {
  titleLocaleKey: string;
  state: string;
  totalDifficulty?: number;
  tasks: ITaskInStateColumn[];
}

export class TaskInStateColumn implements ITaskInStateColumn {
  constructor(task: ITask) {
    this.task = task;
  }

  private _infoToggled = false;
  private _timerInterval = 100;
  private _incrementProgressTimer: number | null = null;
  private _incrementUsedHoursTimer: number | null = null;
  private _decrementProgressTimer: number | null = null;
  private _decrementUsedHoursTimer: number | null = null;

  public toggleInfo() {
    this._infoToggled = !this._infoToggled;
  }

  public startIncrementProgress(): void {
    if (
      this._incrementProgressTimer ||
      Math.floor(this.task.donePercents) === 1
    ) {
      return;
    }

    this._incrementProgressTimer = setInterval(() => {
      if (Math.floor(this.task.donePercents) === 1) {
        this.task.donePercents = 1;
        this.stopIncrementProgress();

        return;
      }

      this.task.donePercents += 0.01;
    }, this._timerInterval);

    this.task.donePercents += 0.01;
  }

  public stopIncrementProgress(): void {
    if (!this._incrementProgressTimer) {
      return;
    }

    clearInterval(this._incrementProgressTimer);
    this._incrementProgressTimer = null;

    store.commit(StyleMutations.setIsSyncIndicatorToggled, true);

    TaskService.patchTask(this.task._id, {
      donePercents: this.task.donePercents,
    }).then(() => {
      store.commit(StyleMutations.setIsSyncIndicatorToggled, false);
    });
  }

  public startDecrementProgress(): void {
    if (
      this._decrementProgressTimer ||
      Math.ceil(this.task.donePercents) === 0
    ) {
      return;
    }

    this._decrementProgressTimer = setInterval(() => {
      if (Math.ceil(this.task.donePercents) === 0) {
        this.task.donePercents = 0;
        this.stopDecrementProgress();

        return;
      }

      this.task.donePercents -= 0.01;
    }, this._timerInterval);

    this.task.donePercents -= 0.01;
  }

  public stopDecrementProgress(): void {
    if (!this._decrementProgressTimer) {
      return;
    }

    clearInterval(this._decrementProgressTimer);
    this._decrementProgressTimer = null;

    store.commit(StyleMutations.setIsSyncIndicatorToggled, true);

    TaskService.patchTask(this.task._id, {
      donePercents: this.task.donePercents,
    }).then(() => {
      store.commit(StyleMutations.setIsSyncIndicatorToggled, false);
    });
  }

  public startIncrementUsedHours(): void {
    if (this._incrementUsedHoursTimer) {
      return;
    }

    this._incrementUsedHoursTimer = setInterval(() => {
      this.task.usedHours++;
    }, this._timerInterval);

    this.task.usedHours++;
  }

  public stopIncrementUsedHours(): void {
    if (!this._incrementUsedHoursTimer) {
      return;
    }

    clearInterval(this._incrementUsedHoursTimer);
    this._incrementUsedHoursTimer = null;

    store.commit(StyleMutations.setIsSyncIndicatorToggled, true);

    TaskService.patchTask(this.task._id, {
      usedHours: this.task.usedHours,
    }).then(() => {
      store.commit(StyleMutations.setIsSyncIndicatorToggled, false);
    });
  }

  public startDecrementUsedHours(): void {
    if (this._decrementUsedHoursTimer || this.task.usedHours === 0) {
      return;
    }

    this._decrementUsedHoursTimer = setInterval(() => {
      if (this.task.usedHours === 0) {
        this.task.usedHours = 0;
        this.stopDecrementUsedHours();

        return;
      }

      this.task.usedHours--;
    }, this._timerInterval);

    this.task.usedHours--;
  }

  public stopDecrementUsedHours(): void {
    if (!this._decrementUsedHoursTimer) {
      return;
    }

    clearInterval(this._decrementUsedHoursTimer);
    this._decrementUsedHoursTimer = null;

    store.commit(StyleMutations.setIsSyncIndicatorToggled, true);

    TaskService.patchTask(this.task._id, {
      usedHours: this.task.usedHours,
    }).then(() => {
      store.commit(StyleMutations.setIsSyncIndicatorToggled, false);
    });
  }

  public get days() {
    const date1 = new Date(this.task.deadline);
    const date2 = new Date();

    const diff = date1.getTime() - date2.getTime();

    return Math.round(diff / (1000 * 60 * 60 * 24));
  }

  public get hours() {
    const date1 = new Date(this.task.deadline);
    const date2 = new Date(this.task.startTime);

    const diff = date1.getTime() - date2.getTime();

    return diff / (1000 * 60 * 60);
  }

  public readonly task: ITask;
  public get infoToggled(): boolean {
    return this._infoToggled;
  }
}

export class TaskStateColumn implements ITaskStateColumn {
  constructor({ titleLocaleKey, state, tasks }: ITaskStateColumn) {
    this.titleLocaleKey = titleLocaleKey;
    this.state = state;
    this._tasks = tasks;
  }

  public get totalDifficulty(): number {
    const difficulties = this.tasks.map((task) => task.task.difficulty);

    return difficulties.reduce((previous, current) => previous + current, 0);
  }

  public get tasks(): ITaskInStateColumn[] {
    for (const task of this._tasks) {
      if (task.task.state === this.state) {
        continue;
      }

      task.task.state = this.state;

      store.commit(StyleMutations.setIsSyncIndicatorToggled, true);

      TaskService.patchTask(task.task._id, { state: this.state }).then(() => {
        store.commit(StyleMutations.setIsSyncIndicatorToggled, false);
      });
    }

    return this._tasks;
  }

  public readonly titleLocaleKey: string;
  public readonly state: string;

  private _tasks: ITaskInStateColumn[];
}
