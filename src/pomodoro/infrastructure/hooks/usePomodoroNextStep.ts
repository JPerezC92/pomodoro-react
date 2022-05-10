import { useCallback } from "react";

import { PomodoroNextStep } from "@/pomodoro/application/PomodoroNextStep";
import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { PomodoroStepType } from "@/pomodoro/domain/Step";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const usePomodoroNextStep = (props: {
  pomodoroStore: PomodoroStore;
}) => {
  const { pomodoroStore } = props;
  const { db, transaction, isLoading } = useUow();

  const pomodoroNextStepRun = useCallback(
    async (props: {
      pomodoroCurrentStep: PomodoroStepType;
      sessionsCount: number;
      taskId: string;
    }) => {
      const { pomodoroCurrentStep, sessionsCount, taskId } = props;
      const pomodoroNextStep = PomodoroNextStep({
        pomodoroStore,
        taskRepository: DexieTaskRepository({ db }),
      });

      await transaction([db.task], async () => {
        pomodoroNextStep.execute({
          pomodoroCurrentStep: pomodoroCurrentStep,
          sessionsCount: sessionsCount,
          taskId,
        });
      });
    },
    [db, pomodoroStore, transaction]
  );

  return { pomodoroNextStepRun, isLoading };
};
