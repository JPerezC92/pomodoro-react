import { Project } from "@/projects/domain/Project";
import { ProjectId } from "@/projects/domain/ProjectId";
import { ProjectName } from "@/projects/domain/ProjectName";
import { ProjectViewDto } from "@/projects/infrastructure/dto/project.dto";
import { ProjectPersistenceDto } from "./dto/project-persistence.dto";

export const ProjectMapper = {
  toView: (project: Project): ProjectViewDto => ({
    id: project.id.value,
    name: project.name.value,
  }),

  toPersistence: (project: Project): ProjectPersistenceDto => ({
    id: project.id.value,
    name: project.name.value,
  }),

  fromPersistence: (project: ProjectPersistenceDto): Project => ({
    id: new ProjectId(project.id),
    name: new ProjectName(project.name),
  }),
};
