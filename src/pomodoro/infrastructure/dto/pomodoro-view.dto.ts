import { PomodoroStepType } from "@/pomodoro/domain/Step";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";
import { PomodoroConfigurationViewDto } from "./pomodoro-configuration-view.dto";

export interface PomodoroViewDto {
  task: TaskViewDto;
  pomodoroConfiguration: PomodoroConfigurationViewDto;
  currentStep: { seconds: number; type: PomodoroStepType; minutes: number };
  isFocus: boolean;
  isBreak: boolean;
  isLongBreak: boolean;
}
