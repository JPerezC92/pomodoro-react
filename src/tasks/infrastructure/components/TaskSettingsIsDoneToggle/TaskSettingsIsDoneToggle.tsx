import { FC, useState } from "react";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

import { useTaskIsDoneToggle } from "@/tasks/infrastructure/hooks/useTaskIsDoneToggle";

type TaskSettingsIsDoneToggleProps = {
  isCompleted: boolean;
  taskId: string;
};

export const TaskSettingsIsDoneToggle: FC<TaskSettingsIsDoneToggleProps> = (
  props
) => {
  const [isCompleted, setIsCompleted] = useState(props.isCompleted);
  const { isLoading, taskIsDoneToggleRun } = useTaskIsDoneToggle();

  return (
    <>
      <FormControl
        alignItems="center"
        backgroundColor="primary.50"
        display="flex"
        justifyContent="space-between"
        p={2}
        rounded="md"
      >
        <FormLabel htmlFor="isDone" mb="0">
          Done
        </FormLabel>

        <Switch
          id="isDone"
          name="isDone"
          isChecked={isCompleted}
          isDisabled={isLoading}
          onChange={() => {
            setIsCompleted((s) => !s);
            taskIsDoneToggleRun({
              isCompleted: props.isCompleted,
              taskId: props.taskId,
            });
          }}
        />
      </FormControl>
    </>
  );
};
