import { NumberValueObject } from "@/shared/domain/valueObject/NumberValueObject";

export class WorkCycle extends NumberValueObject {
  static initial: WorkCycle = new WorkCycle(1);
  static last: WorkCycle = new WorkCycle(4);

  constructor(value: number) {
    super(value);
    // this.validate(value);
  }

  public isRegularCycle(): boolean {
    return this.value !== WorkCycle.last.value;
  }

  public isLongCycle(): boolean {
    return this.value === WorkCycle.last.value;
  }

  validate(workCycle: number): number {
    if (workCycle < WorkCycle.initial.value) {
      throw new Error("Work cycle must be greater than 1");
    }

    if (workCycle > WorkCycle.last.value) {
      throw new Error("Work cycle must be less than 5");
    }

    return workCycle;
  }
}
