import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
import { PomodoroConfigurationPersistence } from "@/pomodoro/infrastructure/dto/pomodoro-configuration-persistence.dto";
import { PomodoroConfigurationViewDto } from "@/pomodoro/infrastructure/dto/pomodoro-configuration-view.dto";
import { Minute } from "@/tasks/domain/Minute";

export function PomodoroConfigurationDomainToView(
  pomodoroConfiguration: PomodoroConfiguration
): PomodoroConfigurationViewDto {
  return {
    focusTimeMinutes: pomodoroConfiguration.focusTimeDuration.value,
    breakTimeMinutes: pomodoroConfiguration.breakTimeDuration.value,
    longBreakTimeMinutes: pomodoroConfiguration.longBreakTimeDuration.value,
  };
}

export function PomodoroConfigurationDomainToPersistence(
  pomodoroConfiguration: PomodoroConfiguration
): PomodoroConfigurationPersistence {
  return {
    breakTimeMinutes: pomodoroConfiguration.breakTimeDuration.value,
    focusTimeMinutes: pomodoroConfiguration.focusTimeDuration.value,
    longBreakTimeMinutes: pomodoroConfiguration.longBreakTimeDuration.value,
  };
}

export function PomodoroConfigurationViewToDomain(
  pomodoroConfigurationViewDto: PomodoroConfigurationViewDto
): PomodoroConfiguration {
  const {
    breakTimeMinutes: breakTimeDurationMinutes,
    focusTimeMinutes: focussedTimeDurationMinutes,
    longBreakTimeMinutes: longBreakTimeDurationMinutes,
  } = pomodoroConfigurationViewDto;
  return new PomodoroConfiguration({
    breakTimeDuration: new Minute(breakTimeDurationMinutes),
    focusTimeDuration: new Minute(focussedTimeDurationMinutes),
    longBreakTimeDuration: new Minute(longBreakTimeDurationMinutes),
  });
}

export function PomodoroConfigurationPersistenceToDomain(
  pomodoroConfigurationPersistence: PomodoroConfigurationPersistence
): PomodoroConfiguration {
  const {
    breakTimeMinutes: breakTimeDurationMinutes,
    focusTimeMinutes: focussedTimeDurationMinutes,
    longBreakTimeMinutes: longBreakTimeDurationMinutes,
  } = pomodoroConfigurationPersistence;
  return new PomodoroConfiguration({
    breakTimeDuration: new Minute(breakTimeDurationMinutes),
    focusTimeDuration: new Minute(focussedTimeDurationMinutes),
    longBreakTimeDuration: new Minute(longBreakTimeDurationMinutes),
  });
}
