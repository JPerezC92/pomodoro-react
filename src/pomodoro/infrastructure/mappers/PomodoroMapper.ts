import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroViewDto } from "@/pomodoro/infrastructure/dto/pomodoro-view.dto";
import { PomodoroConfigurationDomainToView } from "@/pomodoro/infrastructure/mappers/PomodoroConfigurationMapper";
import { TaskMapper } from "@/tasks/infrastructure/mappers/TaskMapper";

export function PomodoroViewMappper(pomodoro: Pomodoro): PomodoroViewDto {
  const { pomodoroConfiguration } = pomodoro;
  return {
    task: TaskMapper.toView(pomodoro.task),
    pomodoroConfiguration: PomodoroConfigurationDomainToView(
      pomodoroConfiguration
    ),
    currentStep: {
      type: pomodoro.currentStep().type,
      seconds: pomodoro.currentStep().seconds(),
      minutes: pomodoro.currentStep().value.value,
    },
    isBreak: pomodoro.isBreak(),
    isFocus: pomodoro.isFocus(),
    isLongBreak: pomodoro.isLongBreak(),
  };
}
