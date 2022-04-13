import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { useCallback } from "react";
import { PomodoroDto } from "../dto/pomodoro.dto";
import { PomodoroMapper } from "../PomodoroMapper";
import { PomodoroNextStep } from "../../application/PomodoroNextStep";

export const usePomodoroNextStep = (props: {
  pomodoroStore: PomodoroStore;
}) => {
  const { pomodoroStore } = props;
  const { db, transaction, isLoading } = useUow();

  const pomodoroNextStepRun = useCallback(
    async (props: { pomodoroDto: PomodoroDto }) => {
      const { pomodoroDto } = props;
      const pomodoroNextStep = PomodoroNextStep({ pomodoroStore });

      await transaction([db.task], async () => {
        pomodoroNextStep.execute({
          pomodoro: PomodoroMapper.fromPomodoroDto(pomodoroDto),
        });
      });
    },
    [db.task, pomodoroStore, transaction]
  );

  return { pomodoroNextStepRun, isLoading };
};
