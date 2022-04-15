import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
import { Step, StepType } from "@/pomodoro/domain/Step";
import { Minute } from "@/tasks/domain/Minute";
import { Task } from "@/tasks/domain/Task";
import { PomodoroCounter } from "./PomodoroCount";

interface PomodoroProps {
  pomodoroCount?: PomodoroCounter;
  currentStep?: Step;
  task: Task;
}

export class Pomodoro {
  private _pomodoroCounter: PomodoroCounter;
  private _pomodoroConfiguration: PomodoroConfiguration;
  private _task: Task;
  private _focus: Step;
  private _break: Step;
  private _longBreak: Step;
  private _currentStep: Step;

  public get pomodoroCounter(): PomodoroCounter {
    return this._pomodoroCounter;
  }
  public get pomodoroConfiguration(): PomodoroConfiguration {
    return this._pomodoroConfiguration;
  }
  public get task(): Task {
    return this._task;
  }
  public get currentStep(): Step {
    return this._currentStep;
  }

  constructor({ task, currentStep: step, pomodoroCount }: PomodoroProps) {
    this._pomodoroCounter = pomodoroCount || PomodoroCounter.initial;
    this._task = task;
    this._pomodoroConfiguration = task.pomodoroConfiguration;

    const { breakTimeDuration, focussedTimeDuration, longBreakTimeDuration } =
      this._pomodoroConfiguration;

    this._focus = new Step({
      value: new Minute(focussedTimeDuration.value),
      type: StepType.FOCUS,
    });

    this._break = new Step({
      value: new Minute(breakTimeDuration.value),
      type: StepType.BREAK,
    });

    this._longBreak = new Step({
      value: new Minute(longBreakTimeDuration.value),
      type: StepType.LONG_BREAK,
    });

    this._currentStep = step || this._focus;
  }

  public nextStep(): void {
    if (
      Step.isBreak(this._currentStep) ||
      Step.isLongBreak(this._currentStep)
    ) {
      this._currentStep = this._focus;
      return;
    }

    if (Step.isFocus(this._currentStep)) {
      this._currentStep = this.isLongBreakStep()
        ? this._longBreak
        : this._break;
    }
  }

  private isLongBreakStep(): boolean {
    return (
      this._pomodoroCounter.value > 0 && this._pomodoroCounter.value % 4 === 0
    );
  }

  public incrementCount(): void {
    this._pomodoroCounter = this._pomodoroCounter.increment();
  }

  public isBlockFinished(): boolean {
    return (
      Step.isBreak(this._currentStep) || Step.isLongBreak(this._currentStep)
    );
  }

  public isFocus(): boolean {
    return Step.isFocus(this._currentStep);
  }

  public isBreak(): boolean {
    return Step.isBreak(this._currentStep);
  }

  public isLongBreak(): boolean {
    return Step.isLongBreak(this._currentStep);
  }
}
