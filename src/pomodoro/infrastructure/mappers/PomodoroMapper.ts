import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroViewDto } from "@/pomodoro/infrastructure/dto/pomodoro-view.dto";
import { PomodoroConfigurationDomainToView } from "@/pomodoro/infrastructure/mappers/PomodoroConfigurationMapper";

export function PomodoroViewMappper(pomodoro: Pomodoro): PomodoroViewDto {
  const { pomodoroConfiguration } = pomodoro;
  const currentStep = pomodoro.currentStep();

  return {
    pomodoroConfiguration: PomodoroConfigurationDomainToView(
      pomodoroConfiguration
    ),
    currentStep: {
      type: currentStep.type,
      seconds: currentStep.seconds(),
      minutes: currentStep.value.value,
    },
    isBreak: pomodoro.isBreak(),
    isFocus: pomodoro.isFocus(),
    isLongBreak: pomodoro.isLongBreak(),
  };
}
