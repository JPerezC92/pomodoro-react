import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { useCallback } from "react";
import { PomodoroDto } from "../dto/pomodoro.dto";
import { PomodoroMapper } from "../PomodoroMapper";
import { PomodoroNextStep } from "../../application/PomodoroNextStep";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const usePomodoroNextStep = (props: {
  pomodoroStore: PomodoroStore;
}) => {
  const { pomodoroStore } = props;
  const { db, transaction, isLoading } = useUow();

  const pomodoroNextStepRun = useCallback(
    async (props: { pomodoroDto: PomodoroDto; taskId: string }) => {
      const { pomodoroDto, taskId } = props;
      const pomodoroNextStep = PomodoroNextStep({
        pomodoroStore,
        taskRepository: DexieTaskRepository({ db }),
      });

      await transaction([db.task], async () => {
        pomodoroNextStep.execute({
          pomodoro: PomodoroMapper.fromPomodoroDto(pomodoroDto),
          taskId,
        });
      });
    },
    [db, pomodoroStore, transaction]
  );

  return { pomodoroNextStepRun, isLoading };
};
