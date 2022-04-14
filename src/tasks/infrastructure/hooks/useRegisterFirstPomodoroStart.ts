import { useUow } from "@/shared/infrastructure/db/Uow";
import { RegisterFirstPomodoroStart } from "@/tasks/application/RegisterFirstPomodoroStart";
import { FirstPomodoroStartedAt } from "@/tasks/domain/FirstPomodoroStartedAt";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const useRegisterFirstPomodoroStart = () => {
  const { db, transaction, isLoading } = useUow();

  const registerFirstPomodoroStartRun = (props: { taskid: string }) => {
    const { taskid } = props;
    console.log("run run");

    const registerFirstPomodoroStart = RegisterFirstPomodoroStart({
      taskRepository: DexieTaskRepository({ db }),
    });

    transaction([db.task], async () => {
      registerFirstPomodoroStart.execute({
        taskId: taskid,
        date: new FirstPomodoroStartedAt(new Date()),
      });
    });
  };

  return {
    isLoading,
    registerFirstPomodoroStartRun,
  };
};
