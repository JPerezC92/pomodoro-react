import { FC, useCallback, useEffect } from "react";
import { Box, List, ListIcon, ListItem } from "@chakra-ui/react";
import { MdCheckCircle, MdOutlineRadioButtonUnchecked } from "react-icons/md";

import { Layout } from "@/shared/infrastructure/components/Layout";
import { SpinnerFullScreen } from "@/shared/infrastructure/components/SpinnerFullScreen";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { TaskFormCreate } from "@/tasks/infrastructure/components/TaskFormCreate";
import { TasksScreenListItem } from "@/tasks/infrastructure/components/TasksScreenListItem";
import { useTaskFindByProject } from "@/tasks/infrastructure/hooks/useTaskFindByProject";
import { useTaskFindIndividuals } from "@/tasks/infrastructure/hooks/useTaskFindIndividuals";
import { useTaskListLocalStore } from "@/tasks/infrastructure/hooks/useTaskListLocalStore";

type TasksScreenProps = {};

export const TasksScreen: FC<TasksScreenProps> = (props) => {
  const {
    queryParams: { projectId },
    isParsing,
  } = usePullQueryString({
    projectId: "projectId",
  });
  const { taskList: tasks, taskStore } = useTaskListLocalStore();
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

  const findTasks = useCallback(
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
          <TaskFormCreate projectId={projectId} afterCreate={findTasks} />

          <List colorScheme="primary" marginBlockStart={4}>
            {tasks.map((task, index) => (
              <ListItem
                key={task.id}
                backgroundColor={index % 2 === 0 ? "gray.100" : "white"}
              >
                {task.isDone ? (
                  <ListIcon as={MdCheckCircle} color="green.500" />
                ) : (
                  <ListIcon
                    as={MdOutlineRadioButtonUnchecked}
                    color="green.500"
                  />
                )}
                <TasksScreenListItem
                  {...task}
                  afterMarkAsCompleted={findTasks}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Layout>
    </>
  );
};
