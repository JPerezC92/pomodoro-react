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

  public get breakTimeDuration(): Minute {
    return this._breakTimeDuration;
  }
  public get focussedTimeDuration(): Minute {
    return this._focussedTimeDuration;
  }
  public get longBreakTimeDuration(): Minute {
    return this._longBreakTimeDuration;
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
      // focussedTimeDuration: new Minute(25),
      // breakTimeDuration: new Minute(5),
      // longBreakTimeDuration: new Minute(15),
      focussedTimeDuration: new Minute(0.1),
      breakTimeDuration: new Minute(0.05),
      longBreakTimeDuration: new Minute(0.2),
    });
  }
}
