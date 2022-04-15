import { TaskDto } from "@/tasks/infrastructure/dto/task.dto";

export interface TaskHistoryView {
  results: TaskDto[];
  lastPomodoroEndedAt: Date;
  lastPomodoroEndedAtLocaleDate: string;
}
