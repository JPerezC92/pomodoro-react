import { NumberValueObject } from "@/shared/domain/valueObject/NumberValueObject";

export class PomodoroCount extends NumberValueObject {
  public static initial: PomodoroCount = new PomodoroCount(0);

  public increment(): PomodoroCount {
    return new PomodoroCount(this.value + 1);
  }
}
