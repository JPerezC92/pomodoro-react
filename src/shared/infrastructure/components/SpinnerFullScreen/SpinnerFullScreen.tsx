import { Box, Spinner } from "@chakra-ui/react";
import { FC } from "react";

type SpinnerFullScreenProps = {};

export const SpinnerFullScreen: FC<SpinnerFullScreenProps> = (props) => {
  return (
    <>
      <Box w="100vw" height="100vh" display="flex">
        <Spinner
          margin="auto"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    </>
  );
};
