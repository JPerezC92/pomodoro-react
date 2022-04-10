import { UseCase } from "@/shared/domain/UseCase";
import { Project } from "../domain/Project";
import { ProjectRepository } from "../domain/ProjectRepository";

interface Input {
  id: string;
  name: string;
}

export const ProjectCreator: (props: {
  projectRepository: ProjectRepository;
}) => UseCase<Promise<void>, Input> = ({ projectRepository }) => {
  return {
    execute: async ({ id, name }) => {
      const project = new Project({ id, name });

      await projectRepository.persist(project);
    },
  };
};
