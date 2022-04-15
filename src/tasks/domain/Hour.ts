import { NumberValueObject } from "@/shared/domain/valueObject/NumberValueObject";
import { Minute } from "./Minute";

export class Hour extends NumberValueObject {
  static equivalentMinutes: number = 60;

  public toMinutes(): Minute {
    return new Minute(this.value * Hour.equivalentMinutes);
  }
}
