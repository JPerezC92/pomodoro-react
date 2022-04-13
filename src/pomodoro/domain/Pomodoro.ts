import { Step, StepType } from "@/pomodoro/domain/Step";
import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
import { Minute } from "@/tasks/domain/Minute";
import { Task } from "@/tasks/domain/Task";
import { PomodoroCount } from "./PomodoroCount";

interface PomodoroProps {
  pomodoroCount?: PomodoroCount;
  step?: Step;
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

  constructor({ task, step, pomodoroCount }: PomodoroProps) {
    this.pomodoroCount = pomodoroCount || PomodoroCount.initial;
    this.task = task;
    this.pomodoroConfiguration = task.taskConfiguration;

    const { breakTimeDuration, focussedTimeDuration, longBreakTimeDuration } =
      this.pomodoroConfiguration;

    this.focus = new Step({
      value: new Minute(focussedTimeDuration),
      type: StepType.FOCUS,
    });

    this.break = new Step({
      value: new Minute(breakTimeDuration),
      type: StepType.BREAK,
    });

    this.longBreak = new Step({
      value: new Minute(longBreakTimeDuration),
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
}
