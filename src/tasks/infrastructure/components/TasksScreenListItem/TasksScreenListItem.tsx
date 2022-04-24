import { FC, useCallback } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { PomodoroRoutes } from "@/pomodoro/infrastructure/pomodoro.routes";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task.dto";
import { useTaskIsDoneToggle } from "@/tasks/infrastructure/hooks/useTaskIsDoneToggle";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";

type TasksScreenListItemProps = {
  afterMarkAsCompleted?: () => void;
} & TaskViewDto;

export const TasksScreenListItem: FC<TasksScreenListItemProps> = ({
  id,
  name,
  isDone: isCompleted,
  afterMarkAsCompleted,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    taskIsDoneToggleRun: taskIsFinishedToggleRun,
    isLoading: isLoadingTaskIsFinishedToggle,
  } = useTaskIsDoneToggle();

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
  const handleMarkAsCompleted = useCallback(
    () =>
      taskIsFinishedToggleRun({
        taskId: id,
        isCompleted: isCompleted,
      }).then(afterMarkAsCompleted),
    [afterMarkAsCompleted, id, isCompleted, taskIsFinishedToggleRun]
  );

  return (
    <>
      <Button
        onClick={onOpen}
        variant="unstyled"
        width="90%"
        justifyContent="start"
        textAlign="left"
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
                isDisabled={isCompleted}
                borderRadius="none"
                borderTopRadius="md"
                onClick={goToPomodoro}
              >
                Go to pomodoro
              </Button>

              <Button
                borderRadius="none"
                isDisabled={isCompleted}
                isLoading={isLoadingTaskIsFinishedToggle}
                onClick={handleMarkAsCompleted}
              >
                Mark as completed
              </Button>

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
