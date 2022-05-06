import { FC, useEffect } from "react";
import { Button, Divider, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Layout } from "@/shared/infrastructure/components/Layout";
import { Redirect } from "@/shared/infrastructure/components/Redirect";
import { SpinnerFullScreen } from "@/shared/infrastructure/components/SpinnerFullScreen";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { NOT_FOUND } from "@/shared/infrastructure/utils/constants";
import { TaskPomodoroSettingsForm } from "@/tasks/infrastructure/components/TaskPomodoroSettingsForm";
import { TaskSettingsIsDoneToggle } from "@/tasks/infrastructure/components/TaskSettingsIsDoneToggle";
import { useTaskFindById } from "@/tasks/infrastructure/hooks/useFindTaskById";
import { useTaskDelete } from "@/tasks/infrastructure/hooks/useTaskDelete";
import { TaskProvider } from "@/tasks/infrastructure/store/TaskContext";
import { useTaskState } from "@/tasks/infrastructure/store/useTaskState";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";

type TaskSettingsScreenProps = {};

export const TaskSettingsScreen: FC<TaskSettingsScreenProps> = (props) => {
  const router = useRouter();
  const {
    isParsing,
    queryParams: { taskId },
  } = usePullQueryString({ taskId: "taskId" });
  const { task, taskStore } = useTaskState();
  const { taskFindByIdRun, isLoading } = useTaskFindById(taskStore);
  const taskDelete = useTaskDelete();

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
          <Flex direction="column" gap={4} padding={4}>
            <Heading as="h2" size="lg">
              {task.name}
            </Heading>

            <TaskSettingsIsDoneToggle
              isCompleted={task.isDone}
              taskId={task.id}
            />

            <Divider />

            <TaskPomodoroSettingsForm
              taskId={task.id}
              pomodoroConfiguration={task.pomodoroConfiguration}
            />

            <Button
              colorScheme="red"
              onClick={() =>
                taskDelete
                  .taskDeleteRun({ taskId })
                  .then(() => router.push(TaskRoutes.tasks))
              }
              isLoading={taskDelete.isLoading}
            >
              Delete
            </Button>
          </Flex>
        </TaskProvider>
      </Layout>
    </>
  );
};
