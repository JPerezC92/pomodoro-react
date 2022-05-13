import { Project } from "@/projects/domain/Project";
import { ProjectId } from "@/projects/domain/ProjectId";
import { ProjectName } from "@/projects/domain/ProjectName";
import { ProjectPersistenceDto } from "@/projects/infrastructure/dto/project-persistence.dto";
import { ProjectViewDto } from "@/projects/infrastructure/dto/project.dto";
import { TimeSpentDomainToView } from "@/shared/infrastructure/mappers/TimeSpentMapper";
import { TaskPersistenceDto } from "@/tasks/infrastructure/dto/task-persistence.dto";
import {
  TaskDomainToView,
  TaskPersistenceToDomain,
} from "@/tasks/infrastructure/mappers/TaskMapper";

export function ProjectDomainToView(project: Project): ProjectViewDto {
  return {
    id: project.id.value,
    name: project.name.value,
    isDone: project.isDone(),
    taskList: project.taskList.map((task) => TaskDomainToView(task)),
    totalTimeSpent: TimeSpentDomainToView(project.totalTimeSpend()),
    focusTimeSpent: TimeSpentDomainToView(project.focusTimeSpend()),
    breakTimeSpent: TimeSpentDomainToView(project.breakTimeSpend()),
  };
}

export function ProjectDomainToPersistence(
  project: Project
): ProjectPersistenceDto {
  return {
    id: project.id.value,
    name: project.name.value,
  };
}

export function ProjectPersistenceToDomain(props: {
  project: ProjectPersistenceDto;
  taskList: TaskPersistenceDto[];
}): Project {
  const { project, taskList } = props;

  return new Project({
    id: new ProjectId(project.id),
    name: new ProjectName(project.name),
    taskList: taskList.map(TaskPersistenceToDomain),
  });
}
