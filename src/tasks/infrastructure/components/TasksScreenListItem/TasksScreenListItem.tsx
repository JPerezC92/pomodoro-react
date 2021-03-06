import { FC, useCallback } from "react";
import { useRouter } from "next/router";
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

import { PomodoroRoutes } from "@/pomodoro/infrastructure/pomodoro.routes";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";
import { useTaskFindAllWithoutProject } from "@/tasks/infrastructure/hooks/useTaskFindAllWithoutProject";
import { useTaskFindByProject } from "@/tasks/infrastructure/hooks/useTaskFindByProject";
import { useTaskIsDoneToggle } from "@/tasks/infrastructure/hooks/useTaskIsDoneToggle";
import { useTaskListContext } from "@/tasks/infrastructure/store/TaskListContext";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";

type TasksScreenListItemProps = TaskViewDto;

export const TasksScreenListItem: FC<TasksScreenListItemProps> = ({
  id,
  name,
  isDone,
  projectId,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { taskIsDoneToggleRun, isLoading: isLoadingTaskIsFinishedToggle } =
    useTaskIsDoneToggle();

  const { taskListStore } = useTaskListContext();
  const { taskFindAllWithoutProjectRun } =
    useTaskFindAllWithoutProject(taskListStore);
  const { taskFindByProjectRun } = useTaskFindByProject(taskListStore);

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
      taskIsDoneToggleRun({
        taskId: id,
        isCompleted: isDone,
      }).then(() => {
        if (!projectId) return taskFindAllWithoutProjectRun();
        taskFindByProjectRun({ projectId });
      }),
    [
      id,
      isDone,
      projectId,
      taskFindAllWithoutProjectRun,
      taskFindByProjectRun,
      taskIsDoneToggleRun,
    ]
  );

  return (
    <>
      <Button onClick={onOpen} variant="unstyled" textAlign="left">
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
                isDisabled={isDone}
                borderRadius="none"
                borderTopRadius="md"
                onClick={goToPomodoro}
              >
                Go to pomodoro
              </Button>

              <Button
                borderRadius="none"
                isDisabled={isDone}
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
