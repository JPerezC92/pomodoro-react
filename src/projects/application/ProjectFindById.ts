import { ProjectRepository } from "@/projects/domain/ProjectRepository";
import { ProjectStore } from "@/projects/domain/ProjectStore";
import { UseCase } from "@/shared/domain/UseCase";

interface Input {
  projectId: string;
}

export const ProjectFindById: (props: {
  projectRepository: ProjectRepository;
  projectStore: ProjectStore;
}) => UseCase<Promise<void>, Input> = ({ projectRepository, projectStore }) => {
  return {
    execute: async ({ projectId }) => {
      const project = await projectRepository.findById(projectId);

      if (!project) return projectStore.projectNotFound();

      projectStore.updateProject(project);
    },
  };
};
