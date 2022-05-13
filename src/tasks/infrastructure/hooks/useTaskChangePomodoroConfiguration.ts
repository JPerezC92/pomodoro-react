import { PomodoroConfigurationViewDto } from "@/pomodoro/infrastructure/dto/pomodoro-configuration-view.dto";
import { PomodoroConfigurationViewToDomain } from "@/pomodoro/infrastructure/mappers/PomodoroConfigurationMapper";
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
          pomodoroConfiguration: PomodoroConfigurationViewToDomain(
            pomodoroConfiguration
          ),
        });
      }),
    [db, transaction]
  );

  return {
    isLoading,
    taskChangePomodoroConfigurationRun,
  };
};
