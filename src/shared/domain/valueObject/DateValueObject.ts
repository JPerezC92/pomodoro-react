export abstract class DateValueObject {
  constructor(private readonly _value: Date) {}

  public get value(): Date {
    return this._value;
  }
}
