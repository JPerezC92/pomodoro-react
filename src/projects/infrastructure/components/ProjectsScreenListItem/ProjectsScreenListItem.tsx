import { FC } from "react";
import router from "next/router";
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

import { ProjectViewDto } from "@/projects/infrastructure/dto/project.dto";
import { ProjectRoutes } from "@/projects/infrastructure/project.routes";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";

type ProjectsScreenListItemProps = ProjectViewDto;

export const ProjectsScreenListItem: FC<ProjectsScreenListItemProps> = ({
  id,
  name,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="unstyled" textAlign="left" onClick={onOpen}>
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
