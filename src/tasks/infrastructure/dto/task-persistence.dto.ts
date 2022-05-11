import { PomodoroConfigurationPersistence } from "@/pomodoro/infrastructure/dto/pomodoro-configuration-persistence.dto";
import { TaskBaseDto } from "./task-base.dto";

export interface TaskPersistenceDto extends TaskBaseDto {
  id: string;
  lastPomodoroEndedAtLocaleDate?: string;
  pomodoroConfiguration: PomodoroConfigurationPersistence;
  focusSpentTimeSeconds: number;
  breakSpentTimeSeconds: number;
}
