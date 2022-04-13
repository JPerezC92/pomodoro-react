import { Minute } from "@/tasks/domain/Minute";

export enum StepType {
  FOCUS = "FOCUS",
  BREAK = "BREAK",
  LONG_BREAK = "LONG_BREAK",
}

export class Step {
  public type: StepType;
  private _value: Minute;

  public get seconds(): number {
    return this._value.toSeconds().value;
  }

  constructor({ value, type }: { value: Minute; type: StepType }) {
    this._value = value;
    this.type = type;
  }

  static isFocus(other: unknown): boolean {
    return other instanceof Step && other.type === StepType.FOCUS;
  }

  static isBreak(other: unknown): boolean {
    return other instanceof Step && other.type === StepType.BREAK;
  }

  static isLongBreak(other: unknown): boolean {
    return other instanceof Step && other.type === StepType.LONG_BREAK;
  }
}
