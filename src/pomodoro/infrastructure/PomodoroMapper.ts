import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroDto } from "@/pomodoro/infrastructure/dto/pomodoro.dto";
import { Second } from "@/tasks/domain/Second";
import { TaskMapper } from "@/tasks/infrastructure/TaskMapper";
import { PomodoroCount } from "../domain/PomodoroCount";
import { Step } from "../domain/Step";

export const PomodoroMapper = {
  toPomodoroDto: (pomodoro: Pomodoro): PomodoroDto => {
    const {
      pomodoroConfiguration: {
        breakTimeDuration,
        focussedTimeDuration,
        longBreakTimeDuration,
      },
    } = pomodoro;

    return {
      task: TaskMapper.toTaskDto(pomodoro.task),
      pomodoroCount: pomodoro.pomodoroCount.value,
      pomodoroConfiguration: {
        breakTimeDuration: breakTimeDuration.value,
        focussedTimeDuration: focussedTimeDuration.value,
        longBreakTimeDuration: longBreakTimeDuration.value,
      },
      step: {
        seconds: pomodoro.currentStep.seconds,
        type: pomodoro.currentStep.type,
      },
      isBreak: pomodoro.isBreak(),
      isFocus: pomodoro.isFocus(),
      isLongBreak: pomodoro.isLongBreak(),
    };
  },

  fromPomodoroDto: (pomodoroDto: PomodoroDto): Pomodoro => {
    return new Pomodoro({
      task: TaskMapper.fromTaskDto(pomodoroDto.task),
      pomodoroCount: new PomodoroCount(pomodoroDto.pomodoroCount),
      currentStep: new Step({
        value: new Second(pomodoroDto.step.seconds).toMinutes(),
        type: pomodoroDto.step.type,
      }),
    });
  },
};
