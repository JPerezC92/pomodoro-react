import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
import { Task } from "@/tasks/domain/Task";
import { SessionCounter } from "./PomodoroCount";
import { Break, Focus, LongBreak, PomodoroStepType } from "./Step";

interface PomodoroProps {
  sessionCounter: SessionCounter;
  currentStep: PomodoroStepType;
  task: Task;
}

export class Pomodoro {
  private _sessionCounter: SessionCounter;
  private _pomodoroConfiguration: PomodoroConfiguration;
  private _task: Task;

  private _currentStep: PomodoroStepType;

  public get sessionCounter(): SessionCounter {
    return this._sessionCounter;
  }
  public get pomodoroConfiguration(): PomodoroConfiguration {
    return this._pomodoroConfiguration;
  }
  public get task(): Task {
    return this._task;
  }

  constructor({ task, currentStep, sessionCounter }: PomodoroProps) {
    this._sessionCounter = sessionCounter;
    this._task = task;
    this._pomodoroConfiguration = task.pomodoroConfiguration;
    this._pomodoroConfiguration;
    this._currentStep = currentStep;
  }

  public static initialize(props: { task: Task }): Pomodoro {
    const { task } = props;

    return new Pomodoro({
      task: task,
      currentStep: PomodoroStepType.FOCUS,
      sessionCounter: SessionCounter.initial,
    });
  }

  public currentStep(): Focus | Break | LongBreak {
    if (this._currentStep === PomodoroStepType.FOCUS) {
      return new Focus(this._pomodoroConfiguration.focusTimeDuration);
    }

    if (this._currentStep === PomodoroStepType.BREAK) {
      return new Break(this._pomodoroConfiguration.breakTimeDuration);
    }

    return new LongBreak(this._pomodoroConfiguration.longBreakTimeDuration);
  }

  public nextStep(): void {
    if (
      Break.isBreak(this.currentStep()) ||
      LongBreak.isLongBreak(this.currentStep())
    ) {
      this._currentStep = PomodoroStepType.FOCUS;
      return;
    }

    if (Focus.isFocus(this.currentStep())) {
      this._currentStep = this.isLongBreakStep()
        ? PomodoroStepType.LONG_BREAK
        : PomodoroStepType.BREAK;
    }
  }

  private isLongBreakStep(): boolean {
    return (
      this._sessionCounter.value > 0 && this._sessionCounter.value % 4 === 0
    );
  }

  public incrementSessions(): void {
    this._sessionCounter = this._sessionCounter.increment();
  }

  public isBlockFinished(): boolean {
    return (
      Break.isBreak(this.currentStep()) ||
      LongBreak.isLongBreak(this.currentStep())
    );
  }

  public isFocus(): boolean {
    return Focus.isFocus(this.currentStep());
  }

  public isBreak(): boolean {
    return Break.isBreak(this.currentStep());
  }

  public isLongBreak(): boolean {
    return LongBreak.isLongBreak(this.currentStep());
  }
}
