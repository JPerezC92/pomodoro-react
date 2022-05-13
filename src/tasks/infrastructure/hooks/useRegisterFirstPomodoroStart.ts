import { useUow } from "@/shared/infrastructure/db/Uow";
import { RegisterFirstPomodoroStart } from "@/tasks/application/RegisterFirstPomodoroStart";
import { FirstPomodoroStartedAt } from "@/tasks/domain/FirstPomodoroStartedAt";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const useRegisterFirstPomodoroStart = () => {
  const { db, transaction, isLoading } = useUow();

  const registerFirstPomodoroStartRun = async (props: { taskId: string }) =>
    await transaction([db.task], async () => {
      const { taskId: taskid } = props;

      const registerFirstPomodoroStart = RegisterFirstPomodoroStart({
        taskRepository: DexieTaskRepository({ db }),
      });

      await registerFirstPomodoroStart.execute({
        taskId: taskid,
        date: new FirstPomodoroStartedAt(new Date()),
      });
    });

  return {
    isLoading,
    registerFirstPomodoroStartRun,
  };
};
