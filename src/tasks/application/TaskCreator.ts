import { UseCase } from "@/shared/domain/UseCase";
import { Task } from "@/tasks/domain/Task";
import { TaskRepository } from "@/tasks/domain/TaskRepository";
import { ProjectId } from "../domain/ProjectId";
import { TaskId } from "../domain/TaskId";
import { TaskIsDone } from "../domain/TaskIsDone";
import { TaskTitle } from "../domain/TaskTitle";
import { TaskTotalWorkTime } from "../domain/TaskTotalWorkTime";

interface Input {
  id: TaskId;
  title: TaskTitle;
  projectId?: ProjectId;
}

export const TaskCreator: (p: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({ taskRepository }) => {
  return {
    execute: async ({ id, title, projectId }) => {
      await taskRepository.persist(
        new Task({
          id,
          title,
          projectId,
          isDone: TaskIsDone.initialize(),
          totalWorkTime: TaskTotalWorkTime.initialize(),
        })
      );
    },
  };
};
