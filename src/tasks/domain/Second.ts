import { NumberValueObject } from "@/shared/domain/valueObject/NumberValueObject";
import { Milisecond } from "./Milisecond";
import { Minute } from "./Minute";

export class Second extends NumberValueObject {
  static equivalentMiliseconds: number = 1000;

  public toMiliseconds(): Milisecond {
    return new Milisecond(this.value * Second.equivalentMiliseconds);
  }

  public toMinutes(): Minute {
    return new Minute(Math.trunc(this.value / Minute.equivalentSeconds));
  }
}
