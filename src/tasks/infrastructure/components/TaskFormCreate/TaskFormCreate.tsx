import { FC } from "react";
import { Button, chakra, HStack, Icon, Input } from "@chakra-ui/react";
import { AiOutlineFileAdd } from "react-icons/ai";

import { useForm } from "@/shared/infrastructure/hooks/useForm";
import { TaskCreateDto } from "@/tasks/infrastructure/dto/task-create.dto";
import { useTaskCreator } from "@/tasks/infrastructure/hooks/useTaskCreator";
import { useTaskFindAllWithoutProject } from "@/tasks/infrastructure/hooks/useTaskFindAllWithoutProject";
import { useTaskFindByProject } from "@/tasks/infrastructure/hooks/useTaskFindByProject";
import { useTaskListContext } from "@/tasks/infrastructure/store/TaskListContext";

type TaskFormCreateProps = {
  projectId?: string;
};

export const TaskFormCreate: FC<TaskFormCreateProps> = ({ projectId }) => {
  const { taskCreatorRun } = useTaskCreator();
  const { taskListStore } = useTaskListContext();
  const { taskFindAllWithoutProjectRun } =
    useTaskFindAllWithoutProject(taskListStore);
  const { taskFindByProjectRun } = useTaskFindByProject(taskListStore);

  const { formValues, names, handleChange, handleSubmit } =
    useForm<TaskCreateDto>({
      initialValues: {
        name: "",
        projectId: projectId,
      },

      onSubmit: async (values, clearValues) => {
        taskCreatorRun({ ...values, projectId }).then(() => {
          if (!projectId) return taskFindAllWithoutProjectRun();

          taskFindByProjectRun({ projectId });
        });
        clearValues();
      },
    });

  const isSubmitDisabled = !formValues.name;

  return (
    <>
      <chakra.form role="form" name="taskFormCreate" onSubmit={handleSubmit}>
        <HStack>
          <Input
            id="name"
            name={names.name}
            onChange={handleChange}
            placeholder="Add a new task"
            type="text"
            value={formValues.name}
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
