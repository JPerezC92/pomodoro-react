import { useMemo, useState } from "react";

import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { PomodoroViewDto } from "@/pomodoro/infrastructure/dto/pomodoroView.dto";
import { PomodoroMapper } from "@/pomodoro/infrastructure/PomodoroMapper";

export const usePomodoroLocalStore = () => {
  const [pomodoro, setPomodoro] = useState<PomodoroViewDto | undefined>(
    undefined
  );

  const pomodoroStore: PomodoroStore = useMemo(
    () => ({
      updatePomodoro: (pomodoro: Pomodoro) =>
        setPomodoro(PomodoroMapper.toPomodoroViewDto(pomodoro)),
    }),
    []
  );

  return { pomodoro, pomodoroStore };
};
