import { FC, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Heading,
  Input,
  List,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

import { TaskRoutes } from "@/tasks/infrastructure/task.routes";
import { useForm } from "@/shared/infrastructure/hooks/useForm";
import { useProjectCreator } from "@/projects/infrastructure/hooks/useProjectCreator";
import { useProjectLocalStore } from "@/projects/infrastructure/hooks/useProjectLocalStore";
import { useProjectsFindAll } from "@/projects/infrastructure/hooks/useProjectsFindAll";
import { Layout } from "@/shared/infrastructure/components/Layout";
import { ProjectFormCreate } from "../../components/ProjectFormCreate";

type ProjectsScreenProps = {};

export const ProjectsScreen: FC<ProjectsScreenProps> = (props) => {
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
                <Link
                  href={{
                    pathname: TaskRoutes.tasks,
                    query: { projectId: project.id },
                  }}
                >
                  <a>{project.name}</a>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Layout>
    </>
  );
};
