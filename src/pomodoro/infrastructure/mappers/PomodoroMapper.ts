import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroViewDto } from "@/pomodoro/infrastructure/dto/pomodoro-view.dto";
import { TaskMapper } from "@/tasks/infrastructure/mappers/TaskMapper";
import { PomodoroConfigurationMapper } from "./PomodoroConfigurationMapper";

export const PomodoroMapper = {
  toPomodoroViewDto: (pomodoro: Pomodoro): PomodoroViewDto => {
    const { pomodoroConfiguration } = pomodoro;

    return {
      task: TaskMapper.toView(pomodoro.task),
      pomodoroCount: pomodoro.sessionCounter.value,
      pomodoroConfiguration: PomodoroConfigurationMapper.toViewDto(
        pomodoroConfiguration
      ),
      step: {
        type: pomodoro.currentStep().type,
        seconds: pomodoro.currentStep().seconds(),
        minutes: pomodoro.currentStep().value.value,
      },
      isBreak: pomodoro.isBreak(),
      isFocus: pomodoro.isFocus(),
      isLongBreak: pomodoro.isLongBreak(),
    };
  },
};
