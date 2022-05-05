import { PomodoroConfigurationViewDto } from "@/pomodoro/infrastructure/dto/pomodoro-configuration-view.dto";
import { TaskBaseDto } from "@/tasks/infrastructure/dto/task-base.dto";
import { TaskTotalWorkTimeViewDto } from "@/tasks/infrastructure/dto/task-total-work-time-view.dto";

export interface TaskViewDto extends TaskBaseDto {
  id: string;
  isFirstPomodoroStarted: boolean;
  pomodoroConfiguration: PomodoroConfigurationViewDto;
  totalWorkTime: TaskTotalWorkTimeViewDto;
}
