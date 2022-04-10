import { useMemo, useState } from "react";

import { Project } from "@/projects/domain/Project";
import { ProjectDto } from "@/projects/infrastructure/dto/project.dto";
import { ProjectMapper } from "@/projects/infrastructure/ProjectMapper";
import { ProjectStore } from "@/projects/domain/ProjectStore";

interface UseProjectLocalStoreResult {
  projects: ProjectDto[];
  projectStore: ProjectStore;
}

export const useProjectLocalStore = (): UseProjectLocalStoreResult => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);

  const projectStore: ProjectStore = useMemo(
    () => ({
      updateProjects: (projects: Project[]) => {
        setProjects(projects.map(ProjectMapper.toProjectDto));
      },
    }),
    []
  );

  return {
    projects,
    projectStore,
  };
};
