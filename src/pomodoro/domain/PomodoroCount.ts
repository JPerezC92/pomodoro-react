import { NumberValueObject } from "@/shared/domain/valueObject/NumberValueObject";

export class PomodoroCounter extends NumberValueObject {
  public static initial: PomodoroCounter = new PomodoroCounter(0);

  public increment(): PomodoroCounter {
    return new PomodoroCounter(this.value + 1);
  }
}
