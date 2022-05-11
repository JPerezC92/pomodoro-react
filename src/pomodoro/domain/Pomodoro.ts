import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
import { Task } from "@/tasks/domain/Task";
import { Break, Focus, LongBreak, PomodoroStepType } from "./Step";

interface PomodoroProps {
  currentStep: PomodoroStepType;
  task: Task;
}

export class Pomodoro {
  private _pomodoroConfiguration: PomodoroConfiguration;
  private _task: Task;

  private _currentStep: PomodoroStepType;

  public get pomodoroConfiguration(): PomodoroConfiguration {
    return this._pomodoroConfiguration;
  }
  public get task(): Task {
    return this._task;
  }

  constructor({ task, currentStep }: PomodoroProps) {
    this._task = task;
    this._pomodoroConfiguration = task.pomodoroConfiguration;
    this._currentStep = currentStep;
  }

  public static initialize(props: { task: Task }): Pomodoro {
    const { task } = props;

    return new Pomodoro({
      task: task,
      currentStep: PomodoroStepType.FOCUS,
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

  public toTheNextStep(): void {
    const currentStep = this.currentStep();
    if (Break.isBreak(currentStep) || LongBreak.isLongBreak(currentStep)) {
      this._currentStep = PomodoroStepType.FOCUS;
    }

    if (Focus.isFocus(currentStep) && !this.isLongBreakStep()) {
      this._currentStep = PomodoroStepType.BREAK;
    }

    if (Focus.isFocus(currentStep) && this.isLongBreakStep()) {
      this._currentStep = PomodoroStepType.LONG_BREAK;
    }
  }

  private isLongBreakStep(): boolean {
    return (
      this._task.sessionsCount.value > 0 &&
      (this._task.sessionsCount.value + 1) % 4 === 0
    );
  }

  public isSessionFinished(): boolean {
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
