import { PomodoroStepType } from "@/pomodoro/domain/Step";
import { UseCase } from "@/shared/domain/UseCase";
import { Second } from "@/tasks/domain/Second";
import { TaskId } from "@/tasks/domain/TaskId";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

interface Input {
  seconds: Second;
  taskId: TaskId;
  pomodoroCurrentStep: PomodoroStepType;
}

export const RecordElapsedTime: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({ taskRepository }) => {
  return {
    execute: async ({
      seconds,
      taskId,
      pomodoroCurrentStep,
    }): Promise<void> => {
      console.log("RecordElapsedTime.execute", pomodoroCurrentStep);
      const task = await taskRepository.findById({ id: taskId.value });

      if (!task) return;

      if (pomodoroCurrentStep === PomodoroStepType.FOCUS) {
        task.addFocusTimeSpend(seconds);
      }

      if (
        pomodoroCurrentStep === PomodoroStepType.BREAK ||
        pomodoroCurrentStep === PomodoroStepType.LONG_BREAK
      ) {
        task.addBreakTimeSpend(seconds);
      }

      await taskRepository.update(task);
    },
  };
};
