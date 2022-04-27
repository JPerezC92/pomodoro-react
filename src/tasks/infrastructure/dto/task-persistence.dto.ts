import { PomodoroConfigurationViewDto } from "@/pomodoro/infrastructure/dto/pomodoroConfigurationView.dto";
import { TaskBaseDto } from "./task-base.dto";

export interface TaskPersistenceDto extends TaskBaseDto {
  id: string;
  firstPomodoroStartedAt?: Date;
  lastPomodoroEndedAt?: Date;
  lastPomodoroEndedAtLocaleDate?: string;
  taskTotalWorkTimeSeconds: number;
  isDone: boolean;
  pomodoroConfiguration: PomodoroConfigurationViewDto;
}
