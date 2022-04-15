import { useCallback } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { RegisterLastPomodoroEnded } from "@/tasks/application/RegisterLastPomodoroEnded";
import { LastPomodoroEndedAt } from "@/tasks/domain/LastPomodoroEndedAt";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const useRegisterLastPomodoroEnded = () => {
  const { db, transaction, isLoading } = useUow();

  const registerLastPomodoroEndedRun = useCallback(
    async (props: { taskId: string }) =>
      await transaction([db.task], async () => {
        const { taskId } = props;
        const registerLastPomodoroEnded = RegisterLastPomodoroEnded({
          taskRepository: DexieTaskRepository({ db }),
        });

        return await registerLastPomodoroEnded.execute({
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
