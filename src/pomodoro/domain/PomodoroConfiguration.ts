import { Minute } from "@/tasks/domain/Minute";

interface PomodoroConfigurationProps {
  focussedTimeDuration: Minute;
  breakTimeDuration: Minute;
  longBreakTimeDuration: Minute;
}

export class PomodoroConfiguration {
  private _breakTimeDuration: Minute;
  private _focussedTimeDuration: Minute;
  private _longBreakTimeDuration: Minute;

  public get breakTimeDuration(): number {
    return this._breakTimeDuration.value;
  }

  public get focussedTimeDuration(): number {
    return this._focussedTimeDuration.value;
  }

  public get longBreakTimeDuration(): number {
    return this._longBreakTimeDuration.value;
  }

  constructor({
    focussedTimeDuration,
    breakTimeDuration,
    longBreakTimeDuration,
  }: PomodoroConfigurationProps) {
    this._breakTimeDuration = breakTimeDuration;
    this._focussedTimeDuration = focussedTimeDuration;
    this._longBreakTimeDuration = longBreakTimeDuration;
  }

  public static default(): PomodoroConfiguration {
    return new PomodoroConfiguration({
      focussedTimeDuration: new Minute(25),
      breakTimeDuration: new Minute(5),
      longBreakTimeDuration: new Minute(15),
    });
  }
}

export const testTaskConfiguration = new PomodoroConfiguration({
  focussedTimeDuration: new Minute(0.1),
  breakTimeDuration: new Minute(0.05),
  longBreakTimeDuration: new Minute(0.2),
});
