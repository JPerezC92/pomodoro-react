import { ProjectId } from "@/projects/domain/ProjectId";
import { UseCase } from "@/shared/domain/UseCase";
import { Task } from "@/tasks/domain/Task";
import { TaskId } from "@/tasks/domain/TaskId";
import { TaskRepository } from "@/tasks/domain/TaskRepository";
import { TaskTitle } from "@/tasks/domain/TaskTitle";

interface Input {
  id: TaskId;
  title: TaskTitle;
  projectId?: ProjectId;
}

export const TaskCreator: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({ taskRepository }) => {
  return {
    execute: async ({ id, title, projectId }) => {
      await taskRepository.persist(Task.createNew({ id, title, projectId }));
    },
  };
};
