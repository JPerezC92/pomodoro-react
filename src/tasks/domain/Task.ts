import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
import { DateValueObject } from "@/shared/domain/valueObject/DateValueObject";
import { FirstPomodoroStartedAt } from "./FirstPomodoroStartedAt";
import { LastPomodoroEndedAt } from "./LastPomodoroEndedAt";
import { ProjectId } from "./ProjectId";
import { Second } from "./Second";
import { TaskId } from "./TaskId";
import { TaskTitle } from "./TaskTitle";
import { TaskTotalWorkTime } from "./TaskTotalWorkTime";

interface TaskProps {
  id: TaskId;
  title: TaskTitle;
  taskTotalWorkTime: TaskTotalWorkTime;
  projectId: ProjectId;
  pomodoroConfiguration?: PomodoroConfiguration;
  firstPomodoroStartedAt?: FirstPomodoroStartedAt;
  lastPomodoroEndedAt?: LastPomodoroEndedAt;
}

export class Task {
  private _id: TaskId;
  private _title: TaskTitle;
  private _taskTotalWorkTime: TaskTotalWorkTime;
  private _projectId: ProjectId;
  private _pomodoroConfiguration: PomodoroConfiguration;
  private _firstPomodoroStartedAt?: FirstPomodoroStartedAt | undefined;
  private _lastPomodoroEndedAt?: LastPomodoroEndedAt | undefined;

  public get id(): TaskId {
    return this._id;
  }
  public get title(): TaskTitle {
    return this._title;
  }
  public get projectId(): ProjectId {
    return this._projectId;
  }
  public get taskTotalWorkTime(): TaskTotalWorkTime {
    return this._taskTotalWorkTime;
  }
  public get pomodoroConfiguration(): PomodoroConfiguration {
    return this._pomodoroConfiguration;
  }
  public get firstPomodoroStartedAt(): FirstPomodoroStartedAt | undefined {
    return this._firstPomodoroStartedAt;
  }
  public get lastPomodoroEndedAt(): LastPomodoroEndedAt | undefined {
    return this._lastPomodoroEndedAt;
  }

  constructor({
    id,
    title,
    projectId,
    pomodoroConfiguration,
    firstPomodoroStartedAt,
    lastPomodoroEndedAt,
    taskTotalWorkTime,
  }: TaskProps) {
    this._id = id;
    this._title = title;
    this._taskTotalWorkTime = taskTotalWorkTime;
    this._projectId = projectId;
    this._pomodoroConfiguration =
      pomodoroConfiguration || PomodoroConfiguration.default();
    this._firstPomodoroStartedAt = firstPomodoroStartedAt;
    this._lastPomodoroEndedAt = lastPomodoroEndedAt;
  }

  public registerFirstPomodoroStartedAt(
    firstPomodoroStartedAt: DateValueObject
  ): void {
    if (this._firstPomodoroStartedAt) {
      throw new Error("First Pomodoro already started");
    }

    this._firstPomodoroStartedAt = firstPomodoroStartedAt;
  }

  public registerLastPomodoroEndedAt(
    lastPomodoroEndedAt: DateValueObject
  ): void {
    if (
      this._lastPomodoroEndedAt &&
      this._lastPomodoroEndedAt > lastPomodoroEndedAt
    ) {
      throw new Error("Last Pomodoro ended before the last one");
    }

    this._lastPomodoroEndedAt = lastPomodoroEndedAt;
  }

  public isFirstPomodoroStarted(): boolean {
    return !!this._firstPomodoroStartedAt;
  }

  public recordElapsedTime(value: Second): void {
    this._taskTotalWorkTime = this._taskTotalWorkTime.record(value);
  }
}
