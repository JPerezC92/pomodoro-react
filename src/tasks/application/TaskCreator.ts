import { UseCase } from "@/shared/domain/UseCase";
import { Task } from "@/tasks/domain/Task";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

interface Input {
  id: string;
  title: string;
  projectId: string;
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
