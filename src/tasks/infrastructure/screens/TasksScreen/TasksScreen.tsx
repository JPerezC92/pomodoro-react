import { FC, useEffect } from "react";
import { Box, List, ListIcon, ListItem, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { MdCheckCircle, MdSettings } from "react-icons/md";

import { TaskFormCreate } from "../../components/TaskFormCreate";
import { PomodoroRoutes } from "@/pomodoro/infrastructure/pomodoro.routes";
import { Layout } from "@/shared/infrastructure/components/Layout";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { useTaskFindByProject } from "@/tasks/infrastructure/hooks/useTaskFindByProject";
import { useTaskLocalStore } from "@/tasks/infrastructure/hooks/useTaskLocalStore";

type TasksScreenProps = {};

export const TasksScreen: FC<TasksScreenProps> = (props) => {
  const { queryParams, isParsing } = usePullQueryString({
    projectId: "projectId",
  });

  const { tasks, taskStore } = useTaskLocalStore();

  const { taskFindByProjectRun } = useTaskFindByProject(taskStore);

  useEffect(() => {
    if (!isParsing && queryParams.projectId) {
      taskFindByProjectRun({ projectId: queryParams.projectId });
    }
  }, [isParsing, queryParams.projectId, taskFindByProjectRun]);

  if (isParsing)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );

  return (
    <>
      <Layout title="Tasks">
        <Box as="main" padding={3}>
          <TaskFormCreate
            projectId={queryParams.projectId}
            afterCreate={() =>
              queryParams.projectId &&
              taskFindByProjectRun({ projectId: queryParams.projectId })
            }
          />

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
                  <a>{task.title}</a>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Layout>
    </>
  );
};
