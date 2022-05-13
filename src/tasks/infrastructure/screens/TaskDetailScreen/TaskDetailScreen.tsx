import { FC, Fragment, useEffect } from "react";
import {
  Box,
  Divider,
  Heading,
  HStack,
  IconButton,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { IoReturnUpBackOutline, IoSettingsOutline } from "react-icons/io5";

import { Layout } from "@/shared/infrastructure/components/Layout";
import { Redirect } from "@/shared/infrastructure/components/Redirect";
import { SpinnerFullScreen } from "@/shared/infrastructure/components/SpinnerFullScreen";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { NOT_FOUND } from "@/shared/infrastructure/utils/constants";
import { useTaskFindById } from "@/tasks/infrastructure/hooks/useFindTaskById";
import { TaskViewToDetailList } from "@/tasks/infrastructure/mappers/TaskMapper";
import { useTaskState } from "@/tasks/infrastructure/store/useTaskState";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";

type TaskDetailScreenProps = {};

export const TaskDetailScreen: FC<TaskDetailScreenProps> = (props) => {
  const {
    queryParams: { taskId },
    isParsing,
  } = usePullQueryString({ taskId: "taskId" });
  const { task, taskStore } = useTaskState();
  const { taskFindByIdRun, isLoading } = useTaskFindById(taskStore);
  const isLoadingTaskScreen = isLoading || !task || isParsing || !taskId;

  const canFindTask = !!taskId && !isParsing;

  useEffect(() => {
    if (canFindTask) {
      taskFindByIdRun({ taskId: taskId });
    }
  }, [canFindTask, taskFindByIdRun, taskId]);

  if (isLoadingTaskScreen) return <SpinnerFullScreen />;

  if (task === NOT_FOUND) return <Redirect pathname={TaskRoutes.tasks} />;

  return (
    <>
      <Layout title="Details">
        <Box as="main" paddingBlock={4} paddingInline={3}>
          <HStack
            as="nav"
            spacing="auto"
            backgroundColor="primary.50"
            borderRadius="md"
          >
            <Link
              href={{
                pathname: TaskRoutes.tasks,
                query: { projectId: task.projectId },
              }}
              passHref
            >
              <IconButton
                as="a"
                variant="ghost"
                aria-label="back to task details"
                icon={<IoReturnUpBackOutline />}
              />
            </Link>

            <Heading as="h2" size="md" textAlign="center">
              {task.name}
            </Heading>

            <Link href={TaskRoutes.settings(task.id)} passHref>
              <IconButton
                as="a"
                variant="ghost"
                aria-label="task settings"
                icon={<IoSettingsOutline />}
              />
            </Link>
          </HStack>

          <List>
            {TaskViewToDetailList(task).map((details) => (
              <Fragment key={details.label}>
                <ListItem padding={3}>
                  <Text display="flex">
                    <Text as="b" fontWeight="extrabold">
                      {details.label}:{" "}
                    </Text>
                    <Text as="span" marginInlineStart="auto">
                      {details.value}
                    </Text>
                  </Text>
                </ListItem>

                <Divider />
              </Fragment>
            ))}
          </List>
        </Box>
      </Layout>
    </>
  );
};
