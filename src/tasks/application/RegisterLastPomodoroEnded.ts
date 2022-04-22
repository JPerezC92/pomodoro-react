import { UseCase } from "@/shared/domain/UseCase";
import { LastPomodoroEndedAt } from "../domain/LastPomodoroEndedAt";
import { TaskRepository } from "../domain/TaskRepository";

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
      console.log("RegisterLastPomodoroEnded");
      await taskRepository.update(task);
    },
  };
};
