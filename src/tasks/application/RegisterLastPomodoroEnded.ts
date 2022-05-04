import { UseCase } from "@/shared/domain/UseCase";
import { LastPomodoroEndedAt } from "@/tasks/domain/LastPomodoroEndedAt";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

interface Input {
  taskId: string;
  date: LastPomodoroEndedAt;
}

export const RegisterLastPomodoroEnded: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({ taskRepository }) => {
  return {
    execute: async ({ taskId, date }) => {
      const task = await taskRepository.findById({ id: taskId });

      if (!task) return;

      task.registerLastPomodoroEndedAt(date);

      await taskRepository.update(task);
    },
  };
};
