import { NumberValueObject } from "@/shared/domain/valueObject/NumberValueObject";

export class SessionCounter extends NumberValueObject {
  public static initial: SessionCounter = new SessionCounter(0);

  public increment(): SessionCounter {
    return new SessionCounter(this.value + 1);
  }
}
