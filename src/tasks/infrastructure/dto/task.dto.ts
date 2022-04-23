import { PomodoroConfigurationViewDto } from "@/pomodoro/infrastructure/dto/pomodoroConfigurationView.dto";
import { TaskBaseDto } from "@/tasks/infrastructure/dto/task-base.dto";
import { TaskTotalWorkTimeViewDto } from "@/tasks/infrastructure/dto/task-total-work-time-view.dto";

export interface TaskViewDto extends TaskBaseDto {
  id: string;
  pomodoroConfiguration: PomodoroConfigurationViewDto;
  isFirstPomodoroStarted: boolean;
  firstPomodoroStartedAt?: Date;
  lastPomodoroEndedAt?: Date;
  taskTotalWorkTime: TaskTotalWorkTimeViewDto;
}
