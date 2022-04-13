import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroDto } from "@/pomodoro/infrastructure/dto/pomodoro.dto";
import { Minute } from "@/tasks/domain/Minute";
import { Second } from "@/tasks/domain/Second";
import { TaskMapper } from "@/tasks/infrastructure/TaskMapper";
import { Step } from "../domain/Step";
import { PomodoroCount } from "../domain/PomodoroCount";

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
        breakTimeDuration,
        focussedTimeDuration,
        longBreakTimeDuration,
      },
      step: {
        seconds: pomodoro.currentStep.seconds,
        type: pomodoro.currentStep.type,
      },
    };
  },

  fromPomodoroDto: (pomodoroDto: PomodoroDto): Pomodoro => {
    return new Pomodoro({
      task: TaskMapper.fromTaskDto(pomodoroDto.task),
      pomodoroCount: new PomodoroCount(pomodoroDto.pomodoroCount),
      step: new Step({
        value: new Second(pomodoroDto.step.seconds).toMinutes(),
        type: pomodoroDto.step.type,
      }),
    });
  },
};
