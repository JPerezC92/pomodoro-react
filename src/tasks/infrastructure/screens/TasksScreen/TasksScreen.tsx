import { FC, useEffect } from "react";
import { Box, List, ListIcon, ListItem } from "@chakra-ui/react";
import { MdCheckCircle, MdOutlineRadioButtonUnchecked } from "react-icons/md";

import { Layout } from "@/shared/infrastructure/components/Layout";
import { SpinnerFullScreen } from "@/shared/infrastructure/components/SpinnerFullScreen";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { TaskFormCreate } from "@/tasks/infrastructure/components/TaskFormCreate";
import { TasksScreenListItem } from "@/tasks/infrastructure/components/TasksScreenListItem";
import { useTaskFindAll } from "@/tasks/infrastructure/hooks/useTaskFindAll";
import { TaskListProvider } from "@/tasks/infrastructure/store/TaskListContext";
import { useTaskListState } from "@/tasks/infrastructure/store/useTaskListState";

type TasksScreenProps = {};

export const TasksScreen: FC<TasksScreenProps> = (props) => {
  const {
    queryParams: { projectId },
    isParsing,
  } = usePullQueryString({ projectId: "projectId" });
  const { taskList, taskListStore } = useTaskListState();
  const { taskFindAllRun } = useTaskFindAll(taskListStore);

  const isLoadingTasksScreen = isParsing && taskList.length === 0;

  useEffect(() => {
    if (!isParsing) {
      taskFindAllRun({ projectId });
    }
  }, [isParsing, projectId, taskFindAllRun]);

  if (isLoadingTasksScreen) return <SpinnerFullScreen />;

  return (
    <>
      <Layout title="Tasks">
        <TaskListProvider taskList={taskList} taskListStore={taskListStore}>
          <Box as="main" padding={3}>
            <TaskFormCreate projectId={projectId} />

            <List marginBlockStart={4}>
              {taskList.map((task, index) => (
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
                  <TasksScreenListItem {...task} />
                </ListItem>
              ))}
            </List>
          </Box>
        </TaskListProvider>
      </Layout>
    </>
  );
};
