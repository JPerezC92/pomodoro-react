import { Task } from "../domain/Task";
import { TaskPersistenceDto } from "./dto/task-persistence.dto";
import { TaskDto } from "./dto/task.dto";

export const TaskMapper = {
  toPersistence: (task: Task): TaskPersistenceDto => {
    return {
      id: task.id,
      title: task.title,
      projectId: task.projectId,
    };
  },

  fromPersistence: (task: TaskPersistenceDto): Task => {
    return new Task({
      id: task.id,
      title: task.title,
      projectId: task.projectId,
    });
  },

  toTaskDto: (taskDto: Task): TaskDto => {
    return {
      id: taskDto.id,
      title: taskDto.title,
      projectId: taskDto.projectId,
    };
  },
};
