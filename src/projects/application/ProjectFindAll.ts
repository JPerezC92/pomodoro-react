import { ProjectRepository } from "@/projects/domain/ProjectRepository";
import { ProjectListStore } from "@/projects/domain/ProjectListStore";
import { UseCase } from "@/shared/domain/UseCase";

export const ProjectFindAll: (props: {
  projectRepository: ProjectRepository;
  projectStore: ProjectListStore;
}) => UseCase<Promise<void>> = ({ projectRepository, projectStore }) => {
  return {
    execute: async () => {
      const projects = await projectRepository.findAll();

      projectStore.updateProjects(projects);
    },
  };
};
