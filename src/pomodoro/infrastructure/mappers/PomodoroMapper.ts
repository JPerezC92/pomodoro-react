import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroCounter } from "@/pomodoro/domain/PomodoroCount";
import { Step } from "@/pomodoro/domain/Step";
import { PomodoroViewDto } from "@/pomodoro/infrastructure/dto/pomodoroView.dto";
import { Second } from "@/tasks/domain/Second";
import { TaskMapper } from "@/tasks/infrastructure/mappers/TaskMapper";
import { PomodoroConfigurationMapper } from "./PomodoroConfigurationMapper";

export const PomodoroMapper = {
  toPomodoroViewDto: (pomodoro: Pomodoro): PomodoroViewDto => {
    const { pomodoroConfiguration } = pomodoro;

    return {
      task: TaskMapper.toView(pomodoro.task),
      pomodoroCount: pomodoro.pomodoroCounter.value,
      pomodoroConfiguration: PomodoroConfigurationMapper.toViewDto(
        pomodoroConfiguration
      ),
      step: {
        type: pomodoro.currentStep.type,
        seconds: pomodoro.currentStep.seconds,
        minutes: pomodoro.currentStep.value.value,
      },

      isBreak: pomodoro.isBreak(),
      isFocus: pomodoro.isFocus(),
      isLongBreak: pomodoro.isLongBreak(),
    };
  },

  fromPomodoroViewDto: (pomodoroDto: PomodoroViewDto): Pomodoro => {
    return new Pomodoro({
      task: TaskMapper.fromView(pomodoroDto.task),
      pomodoroCount: new PomodoroCounter(pomodoroDto.pomodoroCount),
      currentStep: new Step({
        value: new Second(pomodoroDto.step.seconds).toMinutes(),
        type: pomodoroDto.step.type,
      }),
    });
  },
};
