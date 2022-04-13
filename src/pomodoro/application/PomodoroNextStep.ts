import { Step } from "@/pomodoro/domain/Step";
import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { UseCase } from "@/shared/domain/UseCase";

export const PomodoroNextStep: (props: {
  pomodoroStore: PomodoroStore;
}) => UseCase<Promise<Pomodoro>, { pomodoro: Pomodoro }> = ({
  pomodoroStore,
}) => {
  return {
    execute: async ({ pomodoro }) => {
      if (pomodoro.isBlockFinished()) {
        pomodoro.incrementCount();
      }

      pomodoro.nextStep();
      pomodoroStore.updatePomodoro(pomodoro);

      return pomodoro;
    },
  };
};
