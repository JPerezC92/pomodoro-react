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
  const { values, handleChange, handleSubmit } = useForm<TaskCreateDto>({
    initialValues: {
      name: "",
      projectId: projectId,
    },

    onSubmit: async (values, clearValues) => {
      taskCreatorRun({ ...values, projectId }).then(afterCreate);
      clearValues();
    },
  });

  const isSubmitDisabled = !values.name;

  return (
    <>
      <chakra.form role="form" name="taskFormCreate" onSubmit={handleSubmit}>
        <HStack>
          <Input
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="Add a new task"
            type="text"
            value={values.name}
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
