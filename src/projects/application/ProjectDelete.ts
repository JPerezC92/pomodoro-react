import { UseCase } from "@/shared/domain/UseCase";
import { ProjectRepository } from "../domain/ProjectRepository";

interface Input {
  projectId: string;
}

export const ProjectDelete: (props: {
  projectRepository: ProjectRepository;
}) => UseCase<Promise<void>, Input> = ({ projectRepository }) => {
  return {
    execute: async ({ projectId }): Promise<void> => {
      await projectRepository.delete(projectId);
    },
  };
};
