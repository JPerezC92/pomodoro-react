import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
import { PomodoroConfigurationViewDto } from "@/pomodoro/infrastructure/dto/pomodoroConfigurationView.dto";
import { Minute } from "@/tasks/domain/Minute";

export const PomodoroConfigurationMapper = {
  toViewDto: (
    pomodoroConfiguration: PomodoroConfiguration
  ): PomodoroConfigurationViewDto => {
    return {
      focussedTimeDurationMinutes:
        pomodoroConfiguration.focussedTimeDuration.value,
      breakTimeDurationMinutes: pomodoroConfiguration.breakTimeDuration.value,
      longBreakTimeDurationMinutes:
        pomodoroConfiguration.longBreakTimeDuration.value,
    };
  },

  fromViewDto: (
    pomodoroConfigurationViewDto: PomodoroConfigurationViewDto
  ): PomodoroConfiguration => {
    const {
      breakTimeDurationMinutes,
      focussedTimeDurationMinutes,
      longBreakTimeDurationMinutes,
    } = pomodoroConfigurationViewDto;
    return new PomodoroConfiguration({
      breakTimeDuration: new Minute(breakTimeDurationMinutes),
      focussedTimeDuration: new Minute(focussedTimeDurationMinutes),
      longBreakTimeDuration: new Minute(longBreakTimeDurationMinutes),
    });
  },
};
