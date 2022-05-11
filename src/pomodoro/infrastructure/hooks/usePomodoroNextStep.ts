import { useCallback } from "react";

import { PomodoroNextStep } from "@/pomodoro/application/PomodoroNextStep";
import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { PomodoroStepType } from "@/pomodoro/domain/Step";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";
import { TaskStore } from "@/tasks/domain/TaskStore";

export const usePomodoroNextStep = (props: {
  pomodoroStore: PomodoroStore;
  taskStore: TaskStore;
}) => {
  const { pomodoroStore, taskStore } = props;
  const { db, transaction, isLoading } = useUow();

  const pomodoroNextStepRun = useCallback(
    async (props: {
      pomodoroCurrentStep: PomodoroStepType;

      taskId: string;
      stepSeconds: number;
    }) => {
      const { pomodoroCurrentStep, taskId, stepSeconds } = props;
      const pomodoroNextStep = PomodoroNextStep({
        pomodoroStore,
        taskStore,
        taskRepository: DexieTaskRepository({ db }),
      });

      await transaction([db.task], async () => {
        pomodoroNextStep.execute({
          pomodoroCurrentStep: pomodoroCurrentStep,

          taskId,
          stepSeconds,
        });
      });
    },
    [db, pomodoroStore, taskStore, transaction]
  );

  return { pomodoroNextStepRun, isLoading };
};
