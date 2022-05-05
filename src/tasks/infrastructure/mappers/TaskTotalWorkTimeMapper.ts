import { TaskTotalWorkTime } from "@/tasks/domain/TaskTotalWorkTime";
import { TaskTotalWorkTimeViewDto } from "@/tasks/infrastructure/dto/task-total-work-time-view.dto";

export const TaskTotalWorkTimeMapper = {
  toViewDto: (
    taskTotalWorkTime: TaskTotalWorkTime
  ): TaskTotalWorkTimeViewDto => {
    return {
      hours: taskTotalWorkTime.hours().value,
      minutes: taskTotalWorkTime.minutes().value,
      seconds: taskTotalWorkTime.value.value,
    };
  },
};
