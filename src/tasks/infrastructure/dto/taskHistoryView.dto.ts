import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";

export interface TaskHistoryView {
  results: TaskViewDto[];
  lastPomodoroEndedAt: Date;
  lastPomodoroEndedAtLocaleDate: string;
}
