import { TaskRoutes } from "@/tasks/infrastructure/task.routes";
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
import router from "next/router";
import { FC } from "react";
import { ProjectViewDto } from "../../dto/project.dto";
import { ProjectRoutes } from "../../project.routes";

type ProjectsScreenListItemProps = ProjectViewDto;

export const ProjectsScreenListItem: FC<ProjectsScreenListItemProps> = ({
  id,
  name,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        variant="unstyled"
        width="full"
        justifyContent="start"
        textAlign="left"
        onClick={onOpen}
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
                onClick={() =>
                  router.push({
                    pathname: TaskRoutes.tasks,
                    query: { projectId: id },
                  })
                }
              >
                Go to tasks
              </Button>

              <Button
                borderRadius="none"
                onClick={() => router.push(ProjectRoutes.projectDetail(id))}
              >
                Project details
              </Button>
              {/* 

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
              </Button> */}
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
