import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroViewDto } from "@/pomodoro/infrastructure/dto/pomodoro-view.dto";
import { PomodoroConfigurationDomainToView } from "@/pomodoro/infrastructure/mappers/PomodoroConfigurationMapper";

export function PomodoroViewMappper(pomodoro: Pomodoro): PomodoroViewDto {
  const { pomodoroConfiguration } = pomodoro;
  const { seconds, type, value: minutes } = pomodoro.currentStep();

  return {
    pomodoroConfiguration: PomodoroConfigurationDomainToView(
      pomodoroConfiguration
    ),
    currentStep: { type, seconds: seconds(), minutes: minutes.value },
    isBreak: pomodoro.isBreak(),
    isFocus: pomodoro.isFocus(),
    isLongBreak: pomodoro.isLongBreak(),
  };
}
