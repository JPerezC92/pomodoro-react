import { BooleanValueObject } from "@/shared/domain/valueObject/BooleanValueObject";

export class TaskIsCompleted extends BooleanValueObject {
  public static initialize(): TaskIsCompleted {
    return new TaskIsCompleted(false);
  }

  public asDone(): TaskIsCompleted {
    return new TaskIsCompleted(true);
  }

  public asUndone(): TaskIsCompleted {
    return new TaskIsCompleted(false);
  }
}
