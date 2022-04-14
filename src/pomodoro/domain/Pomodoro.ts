import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
import { Step, StepType } from "@/pomodoro/domain/Step";
import { Minute } from "@/tasks/domain/Minute";
import { Task } from "@/tasks/domain/Task";
import { PomodoroCount } from "./PomodoroCount";

interface PomodoroProps {
  pomodoroCount?: PomodoroCount;
  currentStep?: Step;
  task: Task;
}

export class Pomodoro {
  pomodoroCount: PomodoroCount;
  pomodoroConfiguration: PomodoroConfiguration;

  task: Task;

  private focus: Step;
  private break: Step;
  private longBreak: Step;

  currentStep: Step;

  constructor({ task, currentStep: step, pomodoroCount }: PomodoroProps) {
    this.pomodoroCount = pomodoroCount || PomodoroCount.initial;
    this.task = task;
    this.pomodoroConfiguration = task.pomodoroConfiguration;

    const { breakTimeDuration, focussedTimeDuration, longBreakTimeDuration } =
      this.pomodoroConfiguration;

    this.focus = new Step({
      value: new Minute(focussedTimeDuration.value),
      type: StepType.FOCUS,
    });

    this.break = new Step({
      value: new Minute(breakTimeDuration.value),
      type: StepType.BREAK,
    });

    this.longBreak = new Step({
      value: new Minute(longBreakTimeDuration.value),
      type: StepType.LONG_BREAK,
    });

    this.currentStep = step || this.focus;
  }

  public nextStep(): void {
    if (Step.isBreak(this.currentStep) || Step.isLongBreak(this.currentStep)) {
      this.currentStep = this.focus;
      return;
    }

    if (Step.isFocus(this.currentStep)) {
      this.currentStep = this.isLongBreakStep() ? this.longBreak : this.break;
    }
  }

  private isLongBreakStep(): boolean {
    return this.pomodoroCount.value > 0 && this.pomodoroCount.value % 4 === 0;
  }

  public incrementCount(): void {
    this.pomodoroCount = this.pomodoroCount.increment();
  }

  public isBlockFinished(): boolean {
    return Step.isBreak(this.currentStep) || Step.isLongBreak(this.currentStep);
  }

  public isFocus(): boolean {
    return Step.isFocus(this.currentStep);
  }

  public isBreak(): boolean {
    return Step.isBreak(this.currentStep);
  }

  public isLongBreak(): boolean {
    return Step.isLongBreak(this.currentStep);
  }
}
