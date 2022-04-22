import { FC } from "react";
import { Box, Divider, Heading, Text } from "@chakra-ui/react";

import { TaskViewDto } from "@/tasks/infrastructure/dto/task.dto";

type TaskHistoryCardProps = {
  task: TaskViewDto;
};

export const TaskHistoryCard: FC<TaskHistoryCardProps> = ({ task }) => {
  return (
    <>
      <Box backgroundColor="primary.50" p={2} rounded="md" fontSize="sm">
        <Box as="header" display="flex">
          <Heading as="h3" fontSize="large">
            {task.name}
          </Heading>

          <Text marginInlineStart="auto">
            <b>Time:</b> {task.taskTotalWorkTime.hours} h{" "}
            {task.taskTotalWorkTime.minutes} m
          </Text>
        </Box>

        <Divider />

        <Text>
          <b>First pomodoro: </b>
          {task.firstPomodoroStartedAt?.toDateString()}
        </Text>

        <Text>
          <b>Last pomodoro: </b>
          {task.lastPomodoroEndedAt?.toDateString()}
        </Text>
      </Box>
    </>
  );
};
