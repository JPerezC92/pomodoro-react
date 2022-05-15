import { useCallback } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { IncrementTimeSpent } from "@/tasks/application/IncrementTimeSpent";
import { Second } from "@/tasks/domain/Second";
import { TaskId } from "@/tasks/domain/TaskId";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";
import { PomodoroStepType } from "@/pomodoro/domain/PomodoroStep";

export const useIncrementTimeSpent = () => {
  const { db, transaction, isLoading } = useUow();

  const incrementTimeSpentRun = useCallback(
    async (props: {
      taskId: string;
      seconds: number;
      pomodoroCurrentStep: PomodoroStepType;
    }) =>
      await transaction([db.task], async () => {
        const { taskId, seconds, pomodoroCurrentStep } = props;

        const incrementTimeSpentRun = IncrementTimeSpent({
          taskRepository: DexieTaskRepository({ db }),
        });

        await incrementTimeSpentRun.execute({
          seconds: new Second(seconds),
          taskId: new TaskId(taskId),
          pomodoroCurrentStep,
        });
      }),
    [db, transaction]
  );

  return {
    incrementTimeSpentRun,
    isLoading,
  };
};
