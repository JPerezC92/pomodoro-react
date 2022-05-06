import { useMemo, useState } from "react";

import { Project } from "@/projects/domain/Project";
import { ProjectViewDto } from "@/projects/infrastructure/dto/project.dto";
import { ProjectMapper } from "@/projects/infrastructure/ProjectMapper";
import { ProjectListStore } from "@/projects/domain/ProjectListStore";

interface UseProjectListStateResult {
  projects: ProjectViewDto[];
  projectStore: ProjectListStore;
}

export const useProjectListState = (): UseProjectListStateResult => {
  const [projects, setProjects] = useState<ProjectViewDto[]>([]);

  const projectStore: ProjectListStore = useMemo(
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
