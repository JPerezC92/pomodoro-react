import { StepType } from "@/pomodoro/domain/Step";
import { TaskDto } from "@/tasks/infrastructure/dto/task.dto";
import { PomodoroConfigurationViewDto } from "./pomodoroConfigurationView.dto";

export interface PomodoroViewDto {
  task: TaskDto;
  pomodoroCount: number;
  pomodoroConfiguration: PomodoroConfigurationViewDto;
  step: { seconds: number; type: StepType; minutes: number };
  isFocus: boolean;
  isBreak: boolean;
  isLongBreak: boolean;
}
