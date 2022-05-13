import React, { FC, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Divider,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoReturnUpBackOutline } from "react-icons/io5";

import { ProjectTaskListTable } from "@/projects/infrastructure/components/ProjectTaskListTable";
import { useProjectDelete } from "@/projects/infrastructure/hooks/useProjectDelete";
import { useProjectFindById } from "@/projects/infrastructure/hooks/useProjectFindById";
import { ProjectDetailsMapper } from "@/projects/infrastructure/mappers/ProjectDetailsMapper";
import { ProjectRoutes } from "@/projects/infrastructure/project.routes";
import { useProjectState } from "@/projects/infrastructure/store/useProjectState";
import { isDefined } from "@/shared/infrastructure/assertions/isDefined";
import { Layout } from "@/shared/infrastructure/components/Layout";
import { Redirect } from "@/shared/infrastructure/components/Redirect";
import { SpinnerFullScreen } from "@/shared/infrastructure/components/SpinnerFullScreen";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { NOT_FOUND } from "@/shared/infrastructure/utils/constants";

type ProjectDetailScreenProps = {};

export const ProjectDetailScreen: FC<ProjectDetailScreenProps> = (props) => {
  const router = useRouter();
  const {
    queryParams: { projectId },
    isParsing,
  } = usePullQueryString({
    projectId: "projectId",
  });
  const { project, projectStore } = useProjectState();
  const { projectFindByIdRun } = useProjectFindById(projectStore);
  const { projectDeleteRun } = useProjectDelete();
  const canRunProjectFindById = isDefined(projectId) && !isParsing;

  useEffect(() => {
    if (canRunProjectFindById) {
      projectFindByIdRun({ projectId });
    }
  }, [canRunProjectFindById, projectFindByIdRun, projectId]);

  if (!project) return <SpinnerFullScreen />;

  if (project === NOT_FOUND) {
    return <Redirect pathname={ProjectRoutes.projects} />;
  }

  const handleProjectDelete = () =>
    projectDeleteRun({ projectId: project.id }).then(() =>
      router.push(ProjectRoutes.projects)
    );

  return (
    <>
      <Layout title="Project">
        <Flex as="main" padding={3} direction="column" gap={8}>
          <Flex
            as="nav"
            justifyContent="space-between"
            alignItems="center"
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

            <Menu>
              <MenuButton
                as={IconButton}
                variant="ghost"
                aria-label="project options"
                icon={<HiOutlineDotsVertical />}
              />

              <MenuList>
                <MenuItem
                  color="secondary.500"
                  onClick={handleProjectDelete}
                  fontWeight="bold"
                  icon={<FaRegTrashAlt />}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>

          <ProjectTaskListTable taskList={project.taskList} />

          <Flex gap={2} direction="column">
            <Heading as="h3" size="md">
              Statistics
            </Heading>

            <Divider />

            <List>
              {ProjectDetailsMapper(project).map((item) => (
                <React.Fragment key={item.label}>
                  <ListItem paddingBlock={3}>
                    <Text display="flex" justifyContent="space-between">
                      <Text as="b" fontWeight="extrabold">
                        {item.label}:
                      </Text>

                      <Text as="span">{item.value}</Text>
                    </Text>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};
