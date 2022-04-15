import { Task } from "./Task";

export interface TaskHistory {
  results: Task[];
  lastPomodoroEndedAt: Date;
  lastPomodoroEndedAtLocaleDate: string;
}
