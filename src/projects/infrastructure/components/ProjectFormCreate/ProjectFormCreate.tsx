import { FC } from "react";
import { Button, chakra, HStack, Icon, Input } from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";

import { useForm } from "@/shared/infrastructure/hooks/useForm";
import { useProjectCreator } from "@/projects/infrastructure/hooks/useProjectCreator";

type ProjectFormCreateProps = {
  afterSubmit?: () => void;
};

export const ProjectFormCreate: FC<ProjectFormCreateProps> = ({
  afterSubmit,
}) => {
  const { projectCreatorRun } = useProjectCreator();
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: { name: "" },
    onSubmit: (values) => projectCreatorRun(values).then(afterSubmit),
  });

  const isSubmitDisabled = !values.name;

  return (
    <>
      <chakra.form role="form" onSubmit={handleSubmit}>
        <HStack>
          <Input
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="Add a new project"
            type="text"
            value={values.name}
            focusBorderColor="tertiary.300"
          />
          <Button
            backgroundColor="tertiary.300"
            disabled={isSubmitDisabled}
            type="submit"
          >
            <Icon as={BiAddToQueue} w={7} h={7} />
          </Button>
        </HStack>
      </chakra.form>
    </>
  );
};
