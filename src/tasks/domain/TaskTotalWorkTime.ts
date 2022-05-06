import { Hour } from "./Hour";
import { Minute } from "./Minute";
import { Second } from "./Second";

export class TaskTotalWorkTime {
  static initialize(): TaskTotalWorkTime {
    return new TaskTotalWorkTime(new Second(0));
  }

  private _value: Second;

  public get value(): Second {
    return this._value;
  }

  constructor(value: Second) {
    this._value = value;
  }

  public increment(seconds: Second): TaskTotalWorkTime {
    return new TaskTotalWorkTime(new Second(this._value.value + seconds.value));
  }

  public minutes(): Minute {
    return new Minute(this._value.toMinutes().value % Hour.equivalentMinutes);
  }

  public hours(): Hour {
    return this._value.toMinutes().toHours();
  }
}
