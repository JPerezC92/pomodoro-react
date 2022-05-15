import { Minute } from "@/tasks/domain/Minute";

export enum PomodoroStepType {
  FOCUS = "FOCUS",
  BREAK = "BREAK",
  LONG_BREAK = "LONG_BREAK",
}

interface PomodoroStep {
  value: Minute;
  type: PomodoroStepType;
}

export class Focus implements PomodoroStep {
  public readonly type: PomodoroStepType = PomodoroStepType.FOCUS;
  public readonly value: Minute;

  constructor(value: Minute) {
    this.value = value;
  }

  public seconds(): number {
    return this.value.toSeconds().value;
  }

  public static isFocus(other: unknown): boolean {
    return other instanceof Focus;
  }
}

export class Break implements PomodoroStep {
  public readonly type: PomodoroStepType = PomodoroStepType.BREAK;
  public readonly value: Minute;

  constructor(value: Minute) {
    this.value = value;
  }

  public seconds(): number {
    return this.value.toSeconds().value;
  }

  public static isBreak(other: unknown): boolean {
    return other instanceof Break;
  }
}

export class LongBreak implements PomodoroStep {
  public readonly type: PomodoroStepType = PomodoroStepType.LONG_BREAK;
  public readonly value: Minute;

  constructor(value: Minute) {
    this.value = value;
  }

  public seconds(): number {
    return this.value.toSeconds().value;
  }

  public static isLongBreak(other: unknown): boolean {
    return other instanceof LongBreak;
  }
}
