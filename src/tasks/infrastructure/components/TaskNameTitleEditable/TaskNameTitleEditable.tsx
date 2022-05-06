import { FC } from "react";
import {
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";

import { useForm } from "@/shared/infrastructure/hooks/useForm";
import { useTaskRename } from "@/tasks/infrastructure/hooks/useTaskRename";

type TaskNameTitleEditableProps = {
  taskName: string;
  taskId: string;
};

export const TaskNameTitleEditable: FC<TaskNameTitleEditableProps> = ({
  taskName,
  taskId,
}) => {
  const { taskRenameRun, isLoading } = useTaskRename();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { formValues, names, handleChange, handleSubmit, resetValues } =
    useForm({
      initialValues: { taskName },
      onSubmit: (v) => {
        taskRenameRun({
          newName: v.taskName,
          taskId: taskId,
        }).then(onClose);
      },
    });

  return (
    <>
      <HStack>
        <Heading as="h2" size="lg" isTruncated>
          {formValues.taskName}
        </Heading>

        <IconButton
          aria-label="edit task name"
          size="sm"
          variant="outline"
          icon={<BiEdit />}
          onClick={onOpen}
        />
      </HStack>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xs"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit}>
          <ModalHeader textAlign="center">Rename</ModalHeader>

          <ModalBody>
            <Input
              value={formValues.taskName}
              name={names.taskName}
              onChange={handleChange}
            />
          </ModalBody>

          <ModalFooter>
            <HStack width="full" spacing={3} justifyContent="center">
              <Button colorScheme="primary" type="submit" isLoading={isLoading}>
                Aceptar
              </Button>
              <Button
                colorScheme="secondary"
                onClick={() => {
                  resetValues();
                  onClose();
                }}
              >
                Cancelar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
