export abstract class BooleanValueObject {
  constructor(private readonly _value: boolean) {}

  public get value(): boolean {
    return this._value;
  }
}
