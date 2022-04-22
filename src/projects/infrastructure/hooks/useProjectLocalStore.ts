import { useMemo, useState } from "react";

import { Project } from "@/projects/domain/Project";
import { ProjectViewDto } from "@/projects/infrastructure/dto/project.dto";
import { ProjectMapper } from "@/projects/infrastructure/ProjectMapper";
import { ProjectStore } from "@/projects/domain/ProjectStore";

interface UseProjectLocalStoreResult {
  projects: ProjectViewDto[];
  projectStore: ProjectStore;
}

export const useProjectLocalStore = (): UseProjectLocalStoreResult => {
  const [projects, setProjects] = useState<ProjectViewDto[]>([]);

  const projectStore: ProjectStore = useMemo(
    () => ({
      updateProjects: (projects: Project[]) => {
        setProjects(projects.map(ProjectMapper.toView));
      },
    }),
    []
  );

  return {
    projects,
    projectStore,
  };
};
