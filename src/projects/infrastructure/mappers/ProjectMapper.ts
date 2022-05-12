import { Project } from "@/projects/domain/Project";
import { ProjectId } from "@/projects/domain/ProjectId";
import { ProjectName } from "@/projects/domain/ProjectName";
import { ProjectViewDto } from "@/projects/infrastructure/dto/project.dto";
import { TaskPersistenceDto } from "@/tasks/infrastructure/dto/task-persistence.dto";
import { TaskMapper } from "@/tasks/infrastructure/mappers/TaskMapper";
import { ProjectPersistenceDto } from "../dto/project-persistence.dto";

export const ProjectMapper = {
  toView: (project: Project): ProjectViewDto => ({
    id: project.id.value,
    name: project.name.value,
    isDone: project.isDone(),
    taskList: project.taskList.map((task) => TaskMapper.toView(task)),
    totalTimeSpent: {
      hours: project.totalTimeSpend().hours().value,
      minutes: project.totalTimeSpend().minutes().value,
    },
    focusTimeSpent: {
      hours: project.focusTimeSpend().hours().value,
      minutes: project.focusTimeSpend().minutes().value,
    },
    breakTimeSpent: {
      hours: project.breakTimeSpend().hours().value,
      minutes: project.breakTimeSpend().minutes().value,
    },
  }),

  toPersistence: (project: Project): ProjectPersistenceDto => ({
    id: project.id.value,
    name: project.name.value,
  }),

  fromPersistence: (props: {
    project: ProjectPersistenceDto;
    taskList: TaskPersistenceDto[];
  }): Project => {
    const { project, taskList } = props;

    return new Project({
      id: new ProjectId(project.id),
      name: new ProjectName(project.name),
      taskList: taskList.map(TaskMapper.fromPersistence),
    });
  },
};
