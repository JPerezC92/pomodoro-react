import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
import { PomodoroConfigurationViewDto } from "@/pomodoro/infrastructure/dto/pomodoroConfigurationView.dto";
import { Minute } from "@/tasks/domain/Minute";
interface PomodoroConfigurationPersistence {
  breakTimeMinutes: number;
  focusTimeMinutes: number;
  longBreakTimeMinutes: number;
}

export const PomodoroConfigurationMapper = {
  toViewDto: (
    pomodoroConfiguration: PomodoroConfiguration
  ): PomodoroConfigurationViewDto => {
    return {
      focusTimeMinutes: pomodoroConfiguration.focusTimeDuration.value,
      breakTimeMinutes: pomodoroConfiguration.breakTimeDuration.value,
      longBreakTimeMinutes: pomodoroConfiguration.longBreakTimeDuration.value,
    };
  },

  fromViewDto: (
    pomodoroConfigurationViewDto: PomodoroConfigurationViewDto
  ): PomodoroConfiguration => {
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
  },

  toPersistence: (
    pomodoroConfiguration: PomodoroConfiguration
  ): PomodoroConfigurationPersistence => {
    return {
      breakTimeMinutes: pomodoroConfiguration.breakTimeDuration.value,
      focusTimeMinutes: pomodoroConfiguration.focusTimeDuration.value,
      longBreakTimeMinutes: pomodoroConfiguration.longBreakTimeDuration.value,
    };
  },

  fromPersistence: (
    pomodoroConfigurationPersistence: PomodoroConfigurationPersistence
  ): PomodoroConfiguration => {
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
  },
};
