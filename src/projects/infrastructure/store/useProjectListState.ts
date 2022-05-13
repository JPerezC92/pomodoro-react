import { useMemo, useState } from "react";
import { Project } from "@/projects/domain/Project";
import { ProjectListStore } from "@/projects/domain/ProjectListStore";
import { ProjectViewDto } from "@/projects/infrastructure/dto/project.dto";
import { ProjectDomainToView } from "@/projects/infrastructure/mappers/ProjectMapper";

interface UseProjectListStateResult {
  projects: ProjectViewDto[];
  projectStore: ProjectListStore;
}

export const useProjectListState = (): UseProjectListStateResult => {
  const [projects, setProjects] = useState<ProjectViewDto[]>([]);

  const projectStore: ProjectListStore = useMemo(
    () => ({
      updateProjects: (projects: Project[]) => {
        setProjects(projects.map(ProjectDomainToView));
      },
    }),
    []
  );

  return {
    projects,
    projectStore,
  };
};
