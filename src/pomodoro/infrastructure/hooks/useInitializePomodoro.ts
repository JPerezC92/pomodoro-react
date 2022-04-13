import { useCallback } from "react";

import { InitializePomodoro } from "@/pomodoro/application/InitializePomodoro";
import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const useInitializePomodoro = (props: {
  pomodoroStore: PomodoroStore;
}) => {
  const { pomodoroStore } = props;

  const { db, isLoading, transaction } = useUow();

  const initializePomodoroRun = useCallback(
    async (props: { taskId: string }) => {
      const { taskId } = props;
      const initializePomodoro = InitializePomodoro({
        taskRepository: DexieTaskRepository({ db }),
        pomodoroStore,
      });

      transaction(
        [db.task],
        async () => await initializePomodoro.execute({ taskId })
      );
    },
    [db, pomodoroStore, transaction]
  );

  return {
    initializePomodoroRun,
    isLoading,
  };
};
