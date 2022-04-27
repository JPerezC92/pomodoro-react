import {
  PomodoroConfiguration,
  PomodoroConfigurationProps,
} from "@/pomodoro/domain/PomodoroConfiguration";
import { DateValueObject } from "@/shared/domain/valueObject/DateValueObject";
import { FirstPomodoroStartedAt } from "./FirstPomodoroStartedAt";
import { LastPomodoroEndedAt } from "./LastPomodoroEndedAt";
import { ProjectId } from "./ProjectId";
import { Second } from "./Second";
import { TaskId } from "./TaskId";
import { TaskIsDone } from "./TaskIsDone";
import { TaskTitle } from "./TaskTitle";
import { TaskTotalWorkTime } from "./TaskTotalWorkTime";

interface TaskProps {
  id: TaskId;
  title: TaskTitle;
  totalWorkTime: TaskTotalWorkTime;
  isDone: TaskIsDone;
  projectId?: ProjectId;
  pomodoroConfiguration: PomodoroConfiguration;
  firstPomodoroStartedAt?: FirstPomodoroStartedAt;
  lastPomodoroEndedAt?: LastPomodoroEndedAt;
}

export class Task {
  private _id: TaskId;
  private _title: TaskTitle;
  private _totalWorkTime: TaskTotalWorkTime;
  private _isDone: TaskIsDone;
  private _projectId?: ProjectId;
  private _pomodoroConfiguration: PomodoroConfiguration;
  private _firstPomodoroStartedAt?: FirstPomodoroStartedAt | undefined;
  private _lastPomodoroEndedAt?: LastPomodoroEndedAt | undefined;

  public get id(): TaskId {
    return this._id;
  }
  public get title(): TaskTitle {
    return this._title;
  }
  public get isDone(): TaskIsDone {
    return this._isDone;
  }
  public get projectId(): ProjectId | undefined {
    return this._projectId;
  }
  public get totalWorkTime(): TaskTotalWorkTime {
    return this._totalWorkTime;
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
    isDone: isCompleted,
    pomodoroConfiguration,
    firstPomodoroStartedAt,
    lastPomodoroEndedAt,
    totalWorkTime,
  }: TaskProps) {
    this._id = id;
    this._title = title;
    this._totalWorkTime = totalWorkTime;
    this._projectId = projectId;
    this._isDone = isCompleted;
    this._pomodoroConfiguration = pomodoroConfiguration;
    this._firstPomodoroStartedAt = firstPomodoroStartedAt;
    this._lastPomodoroEndedAt = lastPomodoroEndedAt;
  }

  public changePomodoroConfiguration(
    pomodoroConfiguration: PomodoroConfigurationProps
  ): void {
    this._pomodoroConfiguration = this._pomodoroConfiguration.change(
      pomodoroConfiguration
    );
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
    this._totalWorkTime = this._totalWorkTime.record(value);
  }

  public markAsDone(): void {
    this._isDone = this._isDone.asDone();
  }

  public markAsUndone(): void {
    this._isDone = this._isDone.asUndone();
  }
}
