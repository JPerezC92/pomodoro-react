import { FC, useEffect } from "react";
import { Box, List, ListItem } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { ProjectFormCreate } from "@/projects/infrastructure/components/ProjectFormCreate";
import { ProjectsScreenListItem } from "@/projects/infrastructure/components/ProjectsScreenListItem";
import { useProjectsFindAll } from "@/projects/infrastructure/hooks/useProjectsFindAll";
import { useProjectListState } from "@/projects/infrastructure/store/useProjectListState";
import { Layout } from "@/shared/infrastructure/components/Layout";

type ProjectsScreenProps = {};

export const ProjectsScreen: FC<ProjectsScreenProps> = (props) => {
  const { projects, projectStore } = useProjectListState();

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
                <ProjectsScreenListItem {...project} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Layout>
    </>
  );
};
