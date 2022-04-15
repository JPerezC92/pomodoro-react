import { NumberValueObject } from "@/shared/domain/valueObject/NumberValueObject";
import { Hour } from "./Hour";
import { Milisecond } from "./Milisecond";
import { Second } from "./Second";

export class Minute extends NumberValueObject {
  static equivalentSeconds: number = 60;

  public toSeconds(): Second {
    return new Second(this.value * Minute.equivalentSeconds);
  }

  public toHours(): Hour {
    return new Hour(Math.trunc(this.value / Hour.equivalentMinutes));
  }

  public toMilliseconds(): Milisecond {
    return new Milisecond(
      this.toSeconds().value * Second.equivalentMiliseconds
    );
  }
}
