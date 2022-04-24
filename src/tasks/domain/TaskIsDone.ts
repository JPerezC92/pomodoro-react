import { BooleanValueObject } from "@/shared/domain/valueObject/BooleanValueObject";

export class TaskIsDone extends BooleanValueObject {
  public static initialize(): TaskIsDone {
    return new TaskIsDone(false);
  }

  public asDone(): TaskIsDone {
    return new TaskIsDone(true);
  }

  public asUndone(): TaskIsDone {
    return new TaskIsDone(false);
  }
}
