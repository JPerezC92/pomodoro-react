import { Hour } from "@/tasks/domain/Hour";
import { Minute } from "@/tasks/domain/Minute";
import { Second } from "@/tasks/domain/Second";

export class TimeSpent {
  static initialize(): TimeSpent {
    return new TimeSpent(new Second(0));
  }

  private _value: Second;

  public get value(): Second {
    return this._value;
  }

  constructor(value: Second) {
    this._value = value;
  }

  public increment(seconds: Second): TimeSpent {
    return new TimeSpent(new Second(this._value.value + seconds.value));
  }

  public minutes(): Minute {
    return new Minute(this._value.toMinutes().value % Hour.equivalentMinutes);
  }

  public hours(): Hour {
    return this._value.toMinutes().toHours();
  }
}
