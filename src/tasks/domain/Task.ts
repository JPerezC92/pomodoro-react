import {
  PomodoroConfiguration,
  PomodoroConfigurationProps,
} from "@/pomodoro/domain/PomodoroConfiguration";
import { SessionCounter } from "@/pomodoro/domain/SessionCounter";
import { ProjectId } from "@/projects/domain/ProjectId";
import { DateValueObject } from "@/shared/domain/valueObject/DateValueObject";
import { FirstPomodoroStartedAt } from "./FirstPomodoroStartedAt";
import { LastPomodoroEndedAt } from "./LastPomodoroEndedAt";
import { Second } from "./Second";
import { TaskId } from "./TaskId";
import { TaskIsDone } from "./TaskIsDone";
import { TaskTitle } from "./TaskTitle";
import { TimeSpent } from "./TaskTotalWorkTime";

interface TaskProps {
  id: TaskId;
  title: TaskTitle;
  focusTimeSpend: TimeSpent;
  breakTimeSpend: TimeSpent;
  isDone: TaskIsDone;
  projectId?: ProjectId;
  pomodoroConfiguration: PomodoroConfiguration;
  sessionsCount: SessionCounter;
  firstPomodoroStartedAt?: FirstPomodoroStartedAt;
  lastPomodoroEndedAt?: LastPomodoroEndedAt;
  createdAt: Date;
}

export class Task {
  private _id: TaskId;
  private _title: TaskTitle;
  private _focusTimeSpend: TimeSpent;
  private _breakTimeSpend: TimeSpent;
  private _isDone: TaskIsDone;
  private _projectId?: ProjectId;
  private _sessionsCount: SessionCounter;
  private _pomodoroConfiguration: PomodoroConfiguration;
  private _firstPomodoroStartedAt?: FirstPomodoroStartedAt | undefined;
  private _lastPomodoroEndedAt?: LastPomodoroEndedAt | undefined;
  readonly createdAt: Date;

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
  public get focusTimeSpend(): TimeSpent {
    return this._focusTimeSpend;
  }
  public get breakTimeSpend(): TimeSpent {
    return this._breakTimeSpend;
  }
  public get pomodoroConfiguration(): PomodoroConfiguration {
    return this._pomodoroConfiguration;
  }
  public get sessionsCount(): SessionCounter {
    return this._sessionsCount;
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
    isDone,
    pomodoroConfiguration,
    sessionsCount,
    firstPomodoroStartedAt,
    lastPomodoroEndedAt,
    focusTimeSpend,
    breakTimeSpend,
    createdAt,
  }: TaskProps) {
    this._id = id;
    this._title = title;
    this._focusTimeSpend = focusTimeSpend;
    this._breakTimeSpend = breakTimeSpend;
    this._projectId = projectId;
    this._isDone = isDone;
    this._pomodoroConfiguration = pomodoroConfiguration;
    this._firstPomodoroStartedAt = firstPomodoroStartedAt;
    this._lastPomodoroEndedAt = lastPomodoroEndedAt;
    this.createdAt = createdAt;
    this._sessionsCount = sessionsCount;
  }

  public static createNew(
    taskProps: Pick<TaskProps, "id" | "title" | "projectId">
  ): Task {
    return new Task({
      id: taskProps.id,
      title: taskProps.title,
      isDone: TaskIsDone.initialize(),
      createdAt: new Date(),
      projectId: taskProps.projectId,
      pomodoroConfiguration: PomodoroConfiguration.default(),
      sessionsCount: SessionCounter.initialize(),
      focusTimeSpend: TimeSpent.initialize(),
      breakTimeSpend: TimeSpent.initialize(),
    });
  }

  public changePomodoroConfiguration(
    pomodoroConfiguration: PomodoroConfiguration
  ): void {
    this._pomodoroConfiguration = pomodoroConfiguration;
  }

  public registerFirstPomodoroStartedAt(
    firstPomodoroStartedAt: FirstPomodoroStartedAt
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

  public addFocusTimeSpend(seconds: Second): void {
    this._focusTimeSpend = this._focusTimeSpend.increment(seconds);
  }

  public addBreakTimeSpend(seconds: Second): void {
    this._breakTimeSpend = this._breakTimeSpend.increment(seconds);
  }

  public markAsDone(): void {
    this._isDone = this._isDone.asDone();
  }

  public markAsUndone(): void {
    this._isDone = this._isDone.asUndone();
  }

  public changeName(newName: string) {
    this._title = this._title.change(newName);
  }

  public incrementSessionCount(): void {
    this._sessionsCount = this._sessionsCount.increment();
  }
}
