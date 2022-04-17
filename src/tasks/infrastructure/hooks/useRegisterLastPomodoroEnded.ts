import { useCallback } from "react";

import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";
import { LastPomodoroEndedAt } from "@/tasks/domain/LastPomodoroEndedAt";
import { RegisterLastPomodoroEnded } from "@/tasks/application/RegisterLastPomodoroEnded";
import { useUow } from "@/shared/infrastructure/db/Uow";

export const useRegisterLastPomodoroEnded = () => {
  const { db, transaction, isLoading } = useUow();

  const registerLastPomodoroEndedRun = useCallback(
    async (props: { taskId: string }) =>
      await transaction([db.task], async () => {
        const { taskId } = props;
        const registerLastPomodoroEnded = RegisterLastPomodoroEnded({
          taskRepository: DexieTaskRepository({ db }),
        });

        await registerLastPomodoroEnded.execute({
          taskId,
          date: new LastPomodoroEndedAt(new Date()),
        });
      }),
    [db, transaction]
  );

  return {
    registerLastPomodoroEndedRun,
    isLoading,
  };
};
