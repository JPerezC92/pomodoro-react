import { Project } from "@/projects/domain/Project";
import { ProjectId } from "@/projects/domain/ProjectId";
import { ProjectName } from "@/projects/domain/ProjectName";
import { ProjectRepository } from "@/projects/domain/ProjectRepository";
import { UseCase } from "@/shared/domain/UseCase";

interface Input {
  id: string;
  name: string;
}

export const ProjectCreator: (props: {
  projectRepository: ProjectRepository;
}) => UseCase<Promise<void>, Input> = ({ projectRepository }) => {
  return {
    execute: async ({ id, name }) => {
      const project = new Project({
        id: new ProjectId(id),
        name: new ProjectName(name),
      });

      await projectRepository.persist(project);
    },
  };
};
