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

// export class Step {
//   private _type: StepType;
//   private _value: Minute;

//   public get type(): StepType {
//     return this._type;
//   }
//   public get seconds(): number {
//     return this._value.toSeconds().value;
//   }

//   public get value(): Minute {
//     return this._value;
//   }

//   constructor({ value, type }: { value: Minute; type: StepType }) {
//     this._value = value;
//     this._type = type;
//   }

//   static isFocus(other: unknown): boolean {
//     return other instanceof Step && other._type === StepType.FOCUS;
//   }

//   static isBreak(other: unknown): boolean {
//     return other instanceof Step && other._type === StepType.BREAK;
//   }

//   static isLongBreak(other: unknown): boolean {
//     return other instanceof Step && other._type === StepType.LONG_BREAK;
//   }
// }
