import { TaskHistory } from "@/tasks/domain/TaskHistory";
import { TaskHistoryView } from "@/tasks/infrastructure/dto/taskHistoryView.dto";
import { TaskMapper } from "@/tasks/infrastructure/mappers/TaskMapper";

export const TaskHistoryMapper = {
  toTaskHistoryView: (taskHistory: TaskHistory): TaskHistoryView => {
    return {
      lastPomodoroEndedAt: taskHistory.lastPomodoroEndedAt,
      lastPomodoroEndedAtLocaleDate: taskHistory.lastPomodoroEndedAtLocaleDate,
      results: taskHistory.results.map(TaskMapper.toTaskDto),
    };
  },
};
