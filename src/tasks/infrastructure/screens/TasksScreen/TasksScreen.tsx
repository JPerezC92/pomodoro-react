import { FC, useCallback, useEffect } from "react";
import { Box, List, ListIcon, ListItem } from "@chakra-ui/react";
import Link from "next/link";
import { MdCheckCircle } from "react-icons/md";

import { PomodoroRoutes } from "@/pomodoro/infrastructure/pomodoro.routes";
import { Layout } from "@/shared/infrastructure/components/Layout";
import { SpinnerFullScreen } from "@/shared/infrastructure/components/SpinnerFullScreen";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { useTaskFindByProject } from "@/tasks/infrastructure/hooks/useTaskFindByProject";
import { useTaskLocalStore } from "@/tasks/infrastructure/hooks/useTaskLocalStore";
import { TaskFormCreate } from "../../components/TaskFormCreate";
import { useTaskFindIndividuals } from "../../hooks/useTaskFindIndividuals";

type TasksScreenProps = {};

export const TasksScreen: FC<TasksScreenProps> = (props) => {
  const {
    queryParams: { projectId },
    isParsing,
  } = usePullQueryString({
    projectId: "projectId",
  });
  const { tasks, taskStore } = useTaskLocalStore();
  const { taskFindByProjectRun } = useTaskFindByProject(taskStore);
  const { taskFindIndividualsRun } = useTaskFindIndividuals(taskStore);

  const isLoadingTasksScreen = isParsing && tasks.length === 0;
  const canRunTaskFindByProject = !isParsing && !!projectId;
  const canRunTaskFindIndividuals = !isParsing && !projectId;

  useEffect(() => {
    if (canRunTaskFindByProject) {
      taskFindByProjectRun({ projectId });
    }

    if (canRunTaskFindIndividuals) {
      taskFindIndividualsRun();
    }
  }, [
    canRunTaskFindByProject,
    canRunTaskFindIndividuals,
    projectId,
    taskFindByProjectRun,
    taskFindIndividualsRun,
  ]);

  const afterCreate = useCallback(
    () =>
      canRunTaskFindByProject && !canRunTaskFindIndividuals
        ? taskFindByProjectRun({ projectId })
        : taskFindIndividualsRun(),
    [
      canRunTaskFindByProject,
      canRunTaskFindIndividuals,
      projectId,
      taskFindByProjectRun,
      taskFindIndividualsRun,
    ]
  );

  if (isLoadingTasksScreen) return <SpinnerFullScreen />;

  return (
    <>
      <Layout title="Tasks">
        <Box as="main" padding={3}>
          <TaskFormCreate projectId={projectId} afterCreate={afterCreate} />

          <List colorScheme="primary" marginBlockStart={4}>
            {tasks.map((task, index) => (
              <ListItem
                key={task.id}
                backgroundColor={index % 2 === 0 ? "gray.100" : "white"}
              >
                <ListIcon as={MdCheckCircle} color="green.500" />
                {/* <ListIcon as={MdSettings} color="green.500" /> */}
                <Link
                  href={{
                    pathname: PomodoroRoutes.Pomodoro,
                    query: { taskId: task.id },
                  }}
                >
                  <a>{task.name}</a>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Layout>
    </>
  );
};
