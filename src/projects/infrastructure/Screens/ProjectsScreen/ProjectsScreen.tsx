import { FC, useEffect } from "react";
import { Box, Button, List, ListIcon, ListItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCheckCircle } from "react-icons/md";

import { ProjectFormCreate } from "@/projects/infrastructure/components/ProjectFormCreate";
import { useProjectLocalStore } from "@/projects/infrastructure/hooks/useProjectLocalStore";
import { useProjectsFindAll } from "@/projects/infrastructure/hooks/useProjectsFindAll";
import { Layout } from "@/shared/infrastructure/components/Layout";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";

type ProjectsScreenProps = {};

export const ProjectsScreen: FC<ProjectsScreenProps> = (props) => {
  const router = useRouter();
  const { projects, projectStore } = useProjectLocalStore();

  const { projectsFindAllRun } = useProjectsFindAll(projectStore);

  useEffect(() => {
    projectsFindAllRun();
  }, [projectsFindAllRun]);

  return (
    <>
      <Layout title="Projects">
        <Box as="main" padding={3}>
          <ProjectFormCreate afterSubmit={projectsFindAllRun} />

          <List marginBlockStart={4}>
            {projects.map((project, index) => (
              <ListItem
                key={project.id}
                backgroundColor={index % 2 === 0 ? "gray.100" : "white"}
              >
                <Button
                  variant="unstyled"
                  width="full"
                  justifyContent="start"
                  textAlign="left"
                  onClick={() =>
                    router.push({
                      pathname: TaskRoutes.tasks,
                      query: { projectId: project.id },
                    })
                  }
                >
                  {project.name}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Layout>
    </>
  );
};
