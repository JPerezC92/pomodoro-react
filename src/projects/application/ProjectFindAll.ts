import { UseCase } from "@/shared/domain/UseCase";
import { Project } from "../domain/Project";
import { ProjectStore } from "../domain/ProjectStore";

interface ProjectRepository {
  findAll(): Promise<Project[]>;
}

export const ProjectFindAll: (props: {
  projectRepository: ProjectRepository;
  projectStore: ProjectStore;
}) => UseCase<Promise<void>> = ({ projectRepository, projectStore }) => {
  return {
    execute: async () => {
      const projects = await projectRepository.findAll();

      projectStore.updateProjects(projects);
    },
  };
};
