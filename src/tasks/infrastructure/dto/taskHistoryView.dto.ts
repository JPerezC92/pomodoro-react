import { TaskViewDto } from "@/tasks/infrastructure/dto/task.dto";

export interface TaskHistoryView {
  results: TaskViewDto[];
  lastPomodoroEndedAt: Date;
  lastPomodoroEndedAtLocaleDate: string;
}
