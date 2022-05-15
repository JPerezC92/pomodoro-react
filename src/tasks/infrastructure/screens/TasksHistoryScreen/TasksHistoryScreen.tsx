import { FC, useEffect } from "react";
import { Box, Divider, Heading, List, ListItem } from "@chakra-ui/react";

import { Layout } from "@/shared/infrastructure/components/Layout";
import { TaskHistoryCard } from "@/tasks/infrastructure/components/TaskHistoryCard";
import { useTaskFindHistory } from "@/tasks/infrastructure/hooks/useTaskFindHistory";
import { useTaskHistoryState } from "@/tasks/infrastructure/store/useTaskHistoryState";

type TasksHistoryScreenProps = {};

export const TasksHistoryScreen: FC<TasksHistoryScreenProps> = (props) => {
  const { taskHistoryList, taskHistoryStore } = useTaskHistoryState();
  const { taskFindHistoryRun } = useTaskFindHistory(taskHistoryStore);

  useEffect(() => {
    taskFindHistoryRun();
  }, [taskFindHistoryRun]);

  return (
    <>
      <Layout title="History">
        <List>
          {taskHistoryList.map(({ lastPomodoroEndedAtLocaleDate, results }) => (
            <ListItem key={lastPomodoroEndedAtLocaleDate}>
              <Box p="5">
                <Heading as="h2" fontSize="sm" textAlign="right">
                  {lastPomodoroEndedAtLocaleDate}
                </Heading>

                <Divider marginBlock={2} />

                <List spacing={4}>
                  {results.map((result) => (
                    <ListItem key={result.id}>
                      <TaskHistoryCard task={result} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </ListItem>
          ))}
        </List>
      </Layout>
    </>
  );
};
