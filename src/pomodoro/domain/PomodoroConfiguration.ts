import { Minute } from "@/tasks/domain/Minute";

export interface PomodoroConfigurationProps {
  focusTimeDuration: Minute;
  breakTimeDuration: Minute;
  longBreakTimeDuration: Minute;
}

export class PomodoroConfiguration {
  private _breakTimeDuration: Minute;
  private _focusTimeDuration: Minute;
  private _longBreakTimeDuration: Minute;

  public get breakTimeDuration(): Minute {
    return this._breakTimeDuration;
  }
  public get focusTimeDuration(): Minute {
    return this._focusTimeDuration;
  }
  public get longBreakTimeDuration(): Minute {
    return this._longBreakTimeDuration;
  }

  constructor({
    focusTimeDuration,
    breakTimeDuration,
    longBreakTimeDuration,
  }: PomodoroConfigurationProps) {
    this._breakTimeDuration = breakTimeDuration;
    this._focusTimeDuration = focusTimeDuration;
    this._longBreakTimeDuration = longBreakTimeDuration;
  }

  public static default(): PomodoroConfiguration {
    return new PomodoroConfiguration({
      focusTimeDuration: new Minute(0.1),
      breakTimeDuration: new Minute(0.05),
      longBreakTimeDuration: new Minute(0.2),
    });
  }
}
