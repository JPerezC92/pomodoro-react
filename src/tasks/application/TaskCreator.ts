import { UseCase } from "@/shared/domain/UseCase";
import { Task } from "@/tasks/domain/Task";
import { TaskRepository } from "@/tasks/domain/TaskRepository";
import { ProjectId } from "../domain/ProjectId";
import { TaskId } from "../domain/TaskId";
import { TaskTitle } from "../domain/TaskTitle";

interface Input {
  id: TaskId;
  title: TaskTitle;
  projectId: ProjectId;
}

export const TaskCreator: (p: {
  taskRepository: TaskRepository;
}) => UseCase<void, Input> = ({ taskRepository }) => {
  return {
    execute: ({ id, title, projectId }) => {
      taskRepository.persist(new Task({ id, title, projectId }));
    },
  };
};
