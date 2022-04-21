import { Minute } from "@/tasks/domain/Minute";

export enum StepType {
  FOCUS = "FOCUS",
  BREAK = "BREAK",
  LONG_BREAK = "LONG_BREAK",
}

export class Step {
  private _type: StepType;
  private _value: Minute;

  public get type(): StepType {
    return this._type;
  }
  public get seconds(): number {
    return this._value.toSeconds().value;
  }

  public get value(): Minute {
    return this._value;
  }

  constructor({ value, type }: { value: Minute; type: StepType }) {
    this._value = value;
    this._type = type;
  }

  static isFocus(other: unknown): boolean {
    return other instanceof Step && other._type === StepType.FOCUS;
  }

  static isBreak(other: unknown): boolean {
    return other instanceof Step && other._type === StepType.BREAK;
  }

  static isLongBreak(other: unknown): boolean {
    return other instanceof Step && other._type === StepType.LONG_BREAK;
  }
}
