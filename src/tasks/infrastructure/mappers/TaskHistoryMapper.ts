import { TaskHistory } from "@/tasks/domain/TaskHistory";
import { TaskHistoryView } from "@/tasks/infrastructure/dto/taskHistoryView.dto";
import { TaskDomainToView } from "@/tasks/infrastructure/mappers/TaskMapper";

export const TaskHistoryMapper = {
  toView: (taskHistory: TaskHistory): TaskHistoryView => {
    return {
      lastPomodoroEndedAt: taskHistory.lastPomodoroEndedAt,
      lastPomodoroEndedAtLocaleDate: taskHistory.lastPomodoroEndedAtLocaleDate,
      results: taskHistory.results.map(TaskDomainToView),
    };
  },
};
