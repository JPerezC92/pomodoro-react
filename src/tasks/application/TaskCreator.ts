import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
import { ProjectId } from "@/projects/domain/ProjectId";
import { UseCase } from "@/shared/domain/UseCase";
import { Task } from "@/tasks/domain/Task";
import { TaskId } from "@/tasks/domain/TaskId";
import { TaskIsDone } from "@/tasks/domain/TaskIsDone";
import { TaskRepository } from "@/tasks/domain/TaskRepository";
import { TaskTitle } from "@/tasks/domain/TaskTitle";
import { TaskTotalWorkTime } from "@/tasks/domain/TaskTotalWorkTime";

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
      await taskRepository.persist(
        new Task({
          id,
          title,
          projectId,
          isDone: TaskIsDone.initialize(),
          totalWorkTime: TaskTotalWorkTime.initialize(),
          pomodoroConfiguration: PomodoroConfiguration.default(),
          createdAt: new Date(),
        })
      );
    },
  };
};
