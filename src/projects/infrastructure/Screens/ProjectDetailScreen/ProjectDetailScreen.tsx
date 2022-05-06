import { ProjectTaskListTable } from "@/projects/infrastructure/components/ProjectTaskListTable";
import { useProjectFindById } from "@/projects/infrastructure/hooks/useProjectFindById";
import { useProjectState } from "@/projects/infrastructure/store/useProjectState";
import { Layout } from "@/shared/infrastructure/components/Layout";
import { Redirect } from "@/shared/infrastructure/components/Redirect";
import { SpinnerFullScreen } from "@/shared/infrastructure/components/SpinnerFullScreen";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { NOT_FOUND } from "@/shared/infrastructure/utils/constants";
import {
  Flex,
  Heading,
  HStack,
  IconButton,
  List,
  ListItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { ProjectRoutes } from "../../project.routes";

type ProjectDetailScreenProps = {};

export const ProjectDetailScreen: FC<ProjectDetailScreenProps> = (props) => {
  const { queryParams, isParsing } = usePullQueryString({
    projectId: "projectId",
  });
  const { project, projectStore } = useProjectState();
  const { projectFindByIdRun } = useProjectFindById(projectStore);

  useEffect(() => {
    if (queryParams.projectId) {
      projectFindByIdRun({ projectId: queryParams.projectId });
    }
  }, [projectFindByIdRun, queryParams.projectId]);

  if (!project) return <SpinnerFullScreen />;

  if (project === NOT_FOUND) {
    return <Redirect pathname={ProjectRoutes.projects} />;
  }

  return (
    <>
      <Layout title="Project">
        <Flex as="main" padding={3} direction="column" gap={8}>
          <HStack
            as="nav"
            spacing="auto"
            backgroundColor="primary.50"
            borderRadius="md"
          >
            <Link href={ProjectRoutes.projects} passHref>
              <IconButton
                as="a"
                variant="ghost"
                aria-label="back to projects"
                icon={<IoReturnUpBackOutline />}
              />
            </Link>

            <Heading as="h2" size="md">
              {project.name}
            </Heading>

            <Link href={ProjectRoutes.settings(project.id)} passHref>
              <IconButton
                as="a"
                variant="ghost"
                aria-label="project options"
                icon={<HiOutlineDotsVertical />}
              />
            </Link>
          </HStack>

          <ProjectTaskListTable taskList={project.taskList} />

          <List>
            <ListItem>
              <b>Total time spent: </b>
              {project.totalTimeSpent.hours} hrs{" "}
              {project.totalTimeSpent.minutes} mins
            </ListItem>
          </List>
        </Flex>
      </Layout>
    </>
  );
};
