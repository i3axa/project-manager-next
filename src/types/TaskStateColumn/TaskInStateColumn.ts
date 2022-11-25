import type IUserDto from '@/models/dto/IUserDto';
import type ITask from '@/models/ITask';
import TaskService from '@/services/TaskService';
import type { ITaskInStateColumn } from './ITaskInStateColumn';
import { useStyleStore } from '@/store/style';
import IntervalValueChanger from './IntervalValueChanger';
import EmployeesService from '@/services/EmployeesService';
import { EmployeesConverter, type Id } from '../API';

const styleStore = useStyleStore();

const getDirectorUser = async (employeeId: Id) => {
  const response = await EmployeesService.fetchEmployeeById(employeeId);
  const employee = await EmployeesConverter.getEmployee(response);

  return employee.user;
};

export class TaskInStateColumn implements ITaskInStateColumn {
  constructor(task: ITask) {
    this.task = task;

    getDirectorUser(task.director).then(
      (result) => (this._taskDirector = result)
    );

    const progressValue = {
      get: () => this.task.progress,
      set: (value: number) => {
        this.task.progress = value;
      },
      applyChange: async () => {
        styleStore.setIsSyncIndicatorToggled(true);

        await TaskService.patchTask(this.task._id, {
          progress: this.task.progress,
        });

        styleStore.setIsSyncIndicatorToggled(false);
      },
    };

    this._progressIncrementor = new IntervalValueChanger({
      value: progressValue,
      lowerLimit: 0,
      upperLimit: 1,
      step: 0.01,
    });

    this._progressDecrementor = new IntervalValueChanger({
      value: progressValue,
      lowerLimit: 0,
      upperLimit: 1,
      step: -0.01,
    });

    const usedHoursValue = {
      get: () => this.task.usedHours,
      set: (value: number) => {
        this.task.usedHours = value;
      },
      applyChange: async () => {
        styleStore.setIsSyncIndicatorToggled(true);

        await TaskService.patchTask(this.task._id, {
          usedHours: this.task.usedHours,
        });

        styleStore.setIsSyncIndicatorToggled(false);
      },
    };

    this._usedHoursIncrementor = new IntervalValueChanger({
      value: usedHoursValue,
      lowerLimit: 0,
      upperLimit: Infinity,
      step: 1,
    });

    this._usedHoursDecrementor = new IntervalValueChanger({
      value: usedHoursValue,
      lowerLimit: 0,
      upperLimit: Infinity,
      step: -1,
    });
  }

  private _taskDirector?: IUserDto;
  private _infoToggled = false;

  private _progressIncrementor: IntervalValueChanger;
  private _progressDecrementor: IntervalValueChanger;
  private _usedHoursIncrementor: IntervalValueChanger;
  private _usedHoursDecrementor: IntervalValueChanger;

  public toggleInfo() {
    this._infoToggled = !this._infoToggled;
  }

  public startIncrementProgress(): void {
    this._progressIncrementor.start();
  }

  public stopIncrementProgress(): void {
    this._progressIncrementor.stop();
  }

  public startDecrementProgress(): void {
    this._progressDecrementor.start();
  }

  public stopDecrementProgress(): void {
    this._progressDecrementor.stop();
  }

  public startIncrementUsedHours(): void {
    this._usedHoursIncrementor.start();
  }

  public stopIncrementUsedHours(): void {
    this._usedHoursIncrementor.stop();
  }

  public startDecrementUsedHours(): void {
    this._usedHoursDecrementor.start();
  }

  public stopDecrementUsedHours(): void {
    this._usedHoursDecrementor.stop();
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

  public get taskDirector(): IUserDto | undefined {
    return this._taskDirector;
  }

  public readonly task: ITask;
  public get infoToggled(): boolean {
    return this._infoToggled;
  }
}
