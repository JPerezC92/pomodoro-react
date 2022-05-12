import { ProjectRoutes } from "@/projects/infrastructure/project.routes";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { AiOutlineHistory, AiOutlineProject } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";

type LayoutProps = { title?: string };

export const Layout: FC<LayoutProps> = ({ children, title }) => {
  const router = useRouter();

  return (
    <Box
      position="relative"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      maxWidth="50rem"
      margin="auto"
      borderWidth="1px"
    >
      <Grid templateRows="auto 1fr auto" templateColumns="100%" height="100%">
        <Box
          minH="3rem"
          display="flex"
          boxShadow="0 0 3px 1px #0005"
          textColor="primary.300"
        >
          <Heading as="h1" fontSize="1.5rem" textAlign="center" margin="auto">
            {title}
          </Heading>
        </Box>

        {children}

        <Box position="sticky" bottom="0" backgroundColor="#fff">
          <ButtonGroup
            isAttached
            variant="outline"
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
          >
            <Button
              type="button"
              onClick={() => router.push(ProjectRoutes.projects)}
            >
              <Icon
                w={8}
                height={8}
                color="primary.400"
                as={AiOutlineProject}
              />
            </Button>

            <Button type="button" onClick={() => router.push(TaskRoutes.tasks)}>
              <Icon w={8} height={8} color="primary.400" as={BsListTask} />
            </Button>

            <Button
              type="button"
              onClick={() => router.push(TaskRoutes.history)}
            >
              <Icon
                w={8}
                height={8}
                color="primary.400"
                as={AiOutlineHistory}
              />
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
    </Box>
  );
};
