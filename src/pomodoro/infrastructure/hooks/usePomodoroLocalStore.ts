import { useMemo, useState } from "react";

import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { PomodoroViewDto } from "@/pomodoro/infrastructure/dto/pomodoro-view.dto";
import { PomodoroViewMappper } from "../mappers/PomodoroMapper";

export const usePomodoroLocalStore = () => {
  const [pomodoro, setPomodoro] = useState<PomodoroViewDto | undefined>(
    undefined
  );

  const pomodoroStore: PomodoroStore = useMemo(
    () => ({
      updatePomodoro: (pomodoro: Pomodoro) =>
        setPomodoro(PomodoroViewMappper(pomodoro)),
    }),
    []
  );

  return { pomodoro, pomodoroStore };
};
