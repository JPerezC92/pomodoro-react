import { Box } from "@chakra-ui/react";
import { FC } from "react";

type PomodoroTimeProps = {
  minutes: number;
  seconds: number;
};

export const PomodoroTime: FC<PomodoroTimeProps> = ({ minutes, seconds }) => {
  return (
    <>
      <>
        <Box
          fontFamily="var(--chakra-fonts-heading)"
          as="h4"
          fontSize="2rem"
          fontWeight="bold"
        >
          {minutes}:{seconds > 9 ? seconds : "0" + seconds}
        </Box>
      </>
    </>
  );
};
