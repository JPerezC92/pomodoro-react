import { PomodoroStepType } from "@/pomodoro/domain/Step";
import { PomodoroConfigurationViewDto } from "./pomodoro-configuration-view.dto";

export interface PomodoroViewDto {
  pomodoroConfiguration: PomodoroConfigurationViewDto;
  currentStep: { seconds: number; type: PomodoroStepType; minutes: number };
  isFocus: boolean;
  isBreak: boolean;
  isLongBreak: boolean;
}
