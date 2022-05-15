import { useCallback } from "react";

import { PomodoroGoToNextStep } from "@/pomodoro/application/PomodoroGoToNextStep";
import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { PomodoroStepType } from "@/pomodoro/domain/Step";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";
import { TaskStore } from "@/tasks/domain/TaskStore";

export const usePomodoroGoToNextStep = (props: {
  pomodoroStore: PomodoroStore;
  taskStore: TaskStore;
}) => {
  const { pomodoroStore, taskStore } = props;
  const { db, transaction, isLoading } = useUow();

  const pomodoroGoToNextStepRun = useCallback(
    async (props: {
      pomodoroCurrentStep: PomodoroStepType;

      taskId: string;
      stepSeconds: number;
    }) => {
      const { pomodoroCurrentStep, taskId, stepSeconds } = props;
      const pomodoroGoToNextStep = PomodoroGoToNextStep({
        pomodoroStore,
        taskStore,
        taskRepository: DexieTaskRepository({ db }),
      });

      await transaction([db.task], async () => {
        pomodoroGoToNextStep.execute({
          pomodoroCurrentStep: pomodoroCurrentStep,

          taskId,
          stepSeconds,
        });
      });
    },
    [db, pomodoroStore, taskStore, transaction]
  );

  return { pomodoroGoToNextStepRun, isLoading };
};
