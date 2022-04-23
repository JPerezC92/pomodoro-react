import { FC, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { MdCheckCircle } from "react-icons/md";
import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { PomodoroRoutes } from "@/pomodoro/infrastructure/pomodoro.routes";
import { Layout } from "@/shared/infrastructure/components/Layout";
import { SpinnerFullScreen } from "@/shared/infrastructure/components/SpinnerFullScreen";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { TaskFormCreate } from "@/tasks/infrastructure/components/TaskFormCreate";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task.dto";
import { useTaskFindByProject } from "@/tasks/infrastructure/hooks/useTaskFindByProject";
import { useTaskFindIndividuals } from "@/tasks/infrastructure/hooks/useTaskFindIndividuals";
import { useTaskLocalStore } from "@/tasks/infrastructure/hooks/useTaskLocalStore";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";

const TaskListItem: FC<TaskViewDto> = ({ name, id }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const goToPomodoro = useCallback(
    () =>
      router.push({
        pathname: PomodoroRoutes.Pomodoro,
        query: { taskId: id },
      }),
    [id, router]
  );
  const gotoSettings = useCallback(
    () => router.push({ pathname: TaskRoutes.settings(id) }),
    [id, router]
  );
  const goToDetails = useCallback(
    () => router.push({ pathname: TaskRoutes.taskDetail(id) }),
    [id, router]
  );

  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        width="90%"
        justifyContent="left"
      >
        {name}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xs"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Options</ModalHeader>

          <ModalBody>
            <ButtonGroup
              variant="outline"
              display="flex"
              flexDirection="column"
              spacing={0}
            >
              <Button
                borderRadius="none"
                borderTopRadius="md"
                onClick={goToPomodoro}
              >
                Go to pomodoro
              </Button>
              <Button borderRadius="none">Mark as completed</Button>
              <Button borderRadius="none" onClick={goToDetails}>
                Task Details
              </Button>

              <Button
                borderRadius="none"
                borderBottomRadius="md"
                onClick={gotoSettings}
              >
                Settings
              </Button>
            </ButtonGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="secondary" onClick={onClose} width="full">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

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
                <TaskListItem {...task} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Layout>
    </>
  );
};
