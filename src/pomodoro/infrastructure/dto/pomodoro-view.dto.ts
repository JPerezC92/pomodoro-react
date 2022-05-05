import { StepType } from "@/pomodoro/domain/Step";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";
import { PomodoroConfigurationViewDto } from "./pomodoro-configuration-view.dto";

export interface PomodoroViewDto {
  task: TaskViewDto;
  pomodoroCount: number;
  pomodoroConfiguration: PomodoroConfigurationViewDto;
  step: { seconds: number; type: StepType; minutes: number };
  isFocus: boolean;
  isBreak: boolean;
  isLongBreak: boolean;
}
