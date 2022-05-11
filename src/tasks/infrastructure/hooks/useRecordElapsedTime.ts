import { useCallback } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { RecordElapsedTime } from "@/tasks/application/RecordElapsedTime";
import { Second } from "@/tasks/domain/Second";
import { TaskId } from "@/tasks/domain/TaskId";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";
import { PomodoroStepType } from "@/pomodoro/domain/Step";

export const useRecordElapsedTime = () => {
  const { db, transaction, isLoading } = useUow();

  const recordElapsedTimeRun = useCallback(
    (props: {
      taskId: string;
      seconds: number;
      pomodoroCurrentStep: PomodoroStepType;
    }) =>
      transaction([db.task], async () => {
        const { taskId, seconds, pomodoroCurrentStep } = props;

        const recordElapsedTime = RecordElapsedTime({
          taskRepository: DexieTaskRepository({ db }),
        });

        await recordElapsedTime.execute({
          seconds: new Second(seconds),
          taskId: new TaskId(taskId),
          pomodoroCurrentStep,
        });
      }),
    [db, transaction]
  );

  return {
    recordElapsedTimeRun,
    isLoading,
  };
};
