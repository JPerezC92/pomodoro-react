import { useCallback } from "react";

import { PomodoroNextStep } from "@/pomodoro/application/PomodoroNextStep";
import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { PomodoroViewDto } from "@/pomodoro/infrastructure/dto/pomodoroView.dto";
import { PomodoroMapper } from "@/pomodoro/infrastructure/mappers/PomodoroMapper";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const usePomodoroNextStep = (props: {
  pomodoroStore: PomodoroStore;
}) => {
  const { pomodoroStore } = props;
  const { db, transaction, isLoading } = useUow();

  const pomodoroNextStepRun = useCallback(
    async (props: { pomodoroDto: PomodoroViewDto; taskId: string }) => {
      const { pomodoroDto, taskId } = props;
      const pomodoroNextStep = PomodoroNextStep({
        pomodoroStore,
        taskRepository: DexieTaskRepository({ db }),
      });

      await transaction([db.task], async () => {
        pomodoroNextStep.execute({
          pomodoroFromView: PomodoroMapper.fromPomodoroViewDto(pomodoroDto),
          taskId,
        });
      });
    },
    [db, pomodoroStore, transaction]
  );

  return { pomodoroNextStepRun, isLoading };
};
