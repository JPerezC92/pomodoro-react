import { Heading, VStack } from "@chakra-ui/react";
import { FC } from "react";

type PomodoroContainerHeaderProps = { name: string };

export const PomodoroContainerHeader: FC<PomodoroContainerHeaderProps> = ({
  name,
}) => {
  return (
    <>
      <VStack>
        <Heading as="h3" fontSize="1rem" color="gray.400">
          Current task
        </Heading>

        <Heading as="h2" fontSize="1.5rem">
          {name}
        </Heading>
      </VStack>
    </>
  );
};
