import { useMemo, useState } from "react";

import { Project } from "@/projects/domain/Project";
import { ProjectStore } from "@/projects/domain/ProjectStore";
import { ProjectViewDto } from "@/projects/infrastructure/dto/project.dto";
import { ProjectMapper } from "@/projects/infrastructure/mappers/ProjectMapper";
import { NOT_FOUND } from "@/shared/infrastructure/utils/constants";

export const useProjectState = () => {
  const [project, setProject] = useState<
    ProjectViewDto | typeof NOT_FOUND | undefined
  >(undefined);

  const projectStore: ProjectStore = useMemo(
    () => ({
      updateProject: (project: Project) =>
        setProject(ProjectMapper.toView(project)),
      projectNotFound: () => setProject(NOT_FOUND),
    }),
    []
  );

  return {
    project,
    projectStore,
  };
};
