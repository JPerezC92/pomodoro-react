import { FC, useEffect } from "react";
import { Divider, VStack } from "@chakra-ui/react";

import { Layout } from "@/shared/infrastructure/components/Layout";
import { Redirect } from "@/shared/infrastructure/components/Redirect";
import { SpinnerFullScreen } from "@/shared/infrastructure/components/SpinnerFullScreen";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { NOT_FOUND } from "@/shared/infrastructure/utils/constants";
import { TaskPomodoroSettingsForm } from "@/tasks/infrastructure/components/TaskPomodoroSettingsForm";
import { TaskSettingsIsDoneToggle } from "@/tasks/infrastructure/components/TaskSettingsIsDoneToggle";
import { useTaskFindById } from "@/tasks/infrastructure/hooks/useFindTaskById";
import { useTaskLocalStore } from "@/tasks/infrastructure/hooks/useTaskLocalStore";
import { TaskProvider } from "@/tasks/infrastructure/store/TaskContext";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";

type TaskSettingsScreenProps = {};

export const TaskSettingsScreen: FC<TaskSettingsScreenProps> = (props) => {
  const {
    isParsing,
    queryParams: { taskId },
  } = usePullQueryString({ taskId: "taskId" });
  const { task, taskStore } = useTaskLocalStore();
  const { taskFindByIdRun, isLoading } = useTaskFindById(taskStore);

  const isLoadingTaskSettingsScreen =
    isParsing || !taskId || isLoading || !task;

  useEffect(() => {
    if (taskId) {
      taskFindByIdRun({ taskId });
    }
  }, [taskFindByIdRun, taskId]);

  if (task === NOT_FOUND) return <Redirect pathname={TaskRoutes.tasks} />;

  if (isLoadingTaskSettingsScreen) return <SpinnerFullScreen />;

  return (
    <>
      <Layout title="Settings">
        <TaskProvider taskStore={taskStore} task={task}>
          <VStack as="main" padding={4} spacing={4}>
            <TaskSettingsIsDoneToggle
              isCompleted={task.isDone}
              taskId={task.id}
            />

            <Divider />

            <TaskPomodoroSettingsForm
              taskId={task.id}
              pomodoroConfiguration={task.pomodoroConfiguration}
            />
          </VStack>
        </TaskProvider>
      </Layout>
    </>
  );
};
