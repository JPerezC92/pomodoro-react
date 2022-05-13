import { TimeSpent } from "@/shared/domain/TimeSpent";
import { TaskTotalWorkTimeViewDto } from "@/tasks/infrastructure/dto/task-total-work-time-view.dto";

export const TimeSpentDomainToView = (
  timeSpent: TimeSpent
): TaskTotalWorkTimeViewDto => {
  return {
    hours: timeSpent.hours().value,
    minutes: timeSpent.minutes().value,
    seconds: timeSpent.value.value,
  };
};
