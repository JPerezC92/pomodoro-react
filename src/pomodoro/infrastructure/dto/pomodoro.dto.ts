import { StepType } from "@/pomodoro/domain/Step";
import { TaskDto } from "@/tasks/infrastructure/dto/task.dto";

export interface PomodoroDto {
  task: TaskDto;
  pomodoroCount: number;
  pomodoroConfiguration: {
    breakTimeDuration: number;
    focussedTimeDuration: number;
    longBreakTimeDuration: number;
  };
  step: { seconds: number; type: StepType };

  isFocus: boolean;
  isBreak: boolean;
  isLongBreak: boolean;
}
