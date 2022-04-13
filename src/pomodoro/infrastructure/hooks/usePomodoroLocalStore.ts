import { useMemo, useState } from "react";

import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { PomodoroDto } from "@/pomodoro/infrastructure/dto/pomodoro.dto";
import { PomodoroMapper } from "@/pomodoro/infrastructure/PomodoroMapper";

export const usePomodoroLocalStore = () => {
  const [pomodoro, setPomodoro] = useState<PomodoroDto | undefined>(undefined);

  const pomodoroStore: PomodoroStore = useMemo(
    () => ({
      updatePomodoro: (pomodoro: Pomodoro) =>
        setPomodoro(PomodoroMapper.toPomodoroDto(pomodoro)),
    }),
    []
  );

  return { pomodoro, pomodoroStore };
};
