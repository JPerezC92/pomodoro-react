import { StringValueObject } from "@/shared/domain/valueObject/StringValueObject";

export class TaskTitle extends StringValueObject {
  public change(newName: string): TaskTitle {
    return new TaskTitle(newName);
  }
}
