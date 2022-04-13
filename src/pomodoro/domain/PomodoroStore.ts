import { Pomodoro } from "./Pomodoro";

export interface PomodoroStore {
  updatePomodoro(pomodoro: Pomodoro): void;
}
