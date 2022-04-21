import { useForm } from "@/shared/infrastructure/hooks/useForm";
import { Button, chakra, HStack, Icon, Input } from "@chakra-ui/react";
import { FC } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { TaskCreateDto } from "../../dto/task-create.dto";
import { useTaskCreator } from "../../hooks/useTaskCreator";

type TaskFormCreateProps = {
  projectId?: string;
  afterCreate?: () => void;
};

export const TaskFormCreate: FC<TaskFormCreateProps> = ({
  projectId,
  afterCreate,
}) => {
  const { taskCreatorRun } = useTaskCreator();
  const { values, handleChange, handleSubmit } = useForm<
    Omit<TaskCreateDto, "projectId">
  >({
    initialValues: {
      title: "",
    },

    onSubmit: async (values, clearValues) => {
      if (!projectId) return;
      taskCreatorRun({ ...values, projectId }).then(afterCreate);
      clearValues();
    },
  });

  const isSubmitDisabled = !values.title;

  return (
    <>
      <chakra.form role="form" name="taskFormCreate" onSubmit={handleSubmit}>
        <HStack>
          <Input
            id="title"
            name="title"
            onChange={handleChange}
            placeholder="Add a new task"
            type="text"
            value={values.title}
            margin="0"
            focusBorderColor="tertiary.300"
          />

          <Button
            type="submit"
            variant="solid"
            isDisabled={isSubmitDisabled}
            backgroundColor="tertiary.300"
          >
            <Icon as={AiOutlineFileAdd} w={7} h={7} />
          </Button>
        </HStack>
      </chakra.form>
    </>
  );
};
