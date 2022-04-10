import { Project } from "@/projects/domain/Project";
import { ProjectDto } from "@/projects/infrastructure/dto/project.dto";
import { ProjectPersistenceDto } from "./dto/project-persistence.dto";

export const ProjectMapper = {
  toProjectDto: (project: Project): ProjectDto => ({
    id: project.id,
    name: project.name,
  }),

  toPersistence: (project: Project): ProjectPersistenceDto => ({
    id: project.id,
    name: project.name,
  }),

  fromPersistence: (project: ProjectPersistenceDto): Project => ({
    id: project.id,
    name: project.name,
  }),
};
