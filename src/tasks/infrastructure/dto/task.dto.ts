import { PomodoroConfigurationViewDto } from "@/pomodoro/infrastructure/dto/pomodoroConfigurationView.dto";
import { TaskBaseDto } from "@/tasks/infrastructure/dto/task-base.dto";
import { TaskTotalWorkTimeViewDto } from "@/tasks/infrastructure/dto/taskTotalWorkTimeView.dto";

export interface TaskDto extends TaskBaseDto {
  id: string;
  projectId: string;
  pomodoroConfiguration: PomodoroConfigurationViewDto;
  isFirstPomodoroStarted: boolean;
  firstPomodoroStartedAt?: Date;
  lastPomodoroEndedAt?: Date;
  taskTotalWorkTime: TaskTotalWorkTimeViewDto;
}
