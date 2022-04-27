import { PomodoroConfigurationViewDto } from "@/pomodoro/infrastructure/dto/pomodoroConfigurationView.dto";
import { PomodoroConfigurationMapper } from "@/pomodoro/infrastructure/mappers/PomodoroConfigurationMapper";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskChangePomodoroConfiguration } from "@/tasks/application/TaskChangePomodoroConfiguration";
import { Minute } from "@/tasks/domain/Minute";
import { useCallback } from "react";
import { DexieTaskRepository } from "../DexieTask.repository";

export const useTaskChangePomodoroConfiguration = () => {
  const { db, isLoading, transaction } = useUow();

  const taskChangePomodoroConfigurationRun = useCallback(
    async (props: {
      taskId: string;
      pomodoroConfiguration: PomodoroConfigurationViewDto;
    }) =>
      await transaction([db.task], async () => {
        const { taskId, pomodoroConfiguration } = props;
        const taskChangePomodoroConfiguration = TaskChangePomodoroConfiguration(
          { taskRepository: DexieTaskRepository({ db }) }
        );

        await taskChangePomodoroConfiguration.execute({
          taskId,
          pomodoroConfiguration: {
            breakTimeDuration: new Minute(
              pomodoroConfiguration.breakTimeMinutes
            ),
            focusTimeDuration: new Minute(
              pomodoroConfiguration.focusTimeMinutes
            ),
            longBreakTimeDuration: new Minute(
              pomodoroConfiguration.longBreakTimeMinutes
            ),
          },
        });
      }),
    [db, transaction]
  );

  return {
    isLoading,
    taskChangePomodoroConfigurationRun,
  };
};
