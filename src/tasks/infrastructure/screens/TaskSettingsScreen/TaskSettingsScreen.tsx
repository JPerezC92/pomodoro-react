import { ProjectRoutes } from "@/projects/infrastructure/project.routes";
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
import { Button, Divider, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { TaskNameTitleEditable } from "../../components/TaskNameTitleEditable";

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
            <TaskNameTitleEditable taskName={task.name} taskId={task.id} />

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
                  .then(() =>
                    task.projectId
                      ? router.push({
                          pathname: TaskRoutes.tasks,
                          query: { projectId: task.projectId },
                        })
                      : router.push(TaskRoutes.tasks)
                  )
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
