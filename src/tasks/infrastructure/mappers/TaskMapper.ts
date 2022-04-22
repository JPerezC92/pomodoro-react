import { PomodoroConfigurationMapper } from "@/pomodoro/infrastructure/mappers/PomodoroConfigurationMapper";
import { FirstPomodoroStartedAt } from "@/tasks/domain/FirstPomodoroStartedAt";
import { LastPomodoroEndedAt } from "@/tasks/domain/LastPomodoroEndedAt";
import { ProjectId } from "@/tasks/domain/ProjectId";
import { Second } from "@/tasks/domain/Second";
import { Task } from "@/tasks/domain/Task";
import { TaskId } from "@/tasks/domain/TaskId";
import { TaskTitle } from "@/tasks/domain/TaskTitle";
import { TaskTotalWorkTime } from "@/tasks/domain/TaskTotalWorkTime";
import { TaskPersistenceDto } from "@/tasks/infrastructure/dto/task-persistence.dto";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task.dto";
import { TaskTotalWorkTimeMapper } from "./TaskTotalWorkTimeMapper";

export const TaskMapper = {
  toPersistence: (task: Task): TaskPersistenceDto => {
    return {
      id: task.id.value,
      name: task.title.value,
      projectId: task.projectId.value,
      firstPomodoroStartedAt: task.firstPomodoroStartedAt?.value,
      lastPomodoroEndedAt: task.lastPomodoroEndedAt?.value,
      lastPomodoroEndedAtLocaleDate:
        task.lastPomodoroEndedAt?.value.toLocaleDateString(),
      taskTotalWorkTimeSeconds: task.taskTotalWorkTime.value.value,
    };
  },

  fromPersistence: (taskPersistence: TaskPersistenceDto): Task => {
    let firstPomodoroStartedAt: FirstPomodoroStartedAt | undefined;
    let lastPomodoroEndedAt: LastPomodoroEndedAt | undefined;

    if (taskPersistence.firstPomodoroStartedAt) {
      firstPomodoroStartedAt = new FirstPomodoroStartedAt(
        taskPersistence.firstPomodoroStartedAt
      );
    }

    if (taskPersistence.lastPomodoroEndedAt) {
      lastPomodoroEndedAt = new FirstPomodoroStartedAt(
        taskPersistence.lastPomodoroEndedAt
      );
    }

    return new Task({
      id: new TaskId(taskPersistence.id),
      title: new TaskTitle(taskPersistence.name),
      projectId: new ProjectId(taskPersistence.projectId),
      firstPomodoroStartedAt: firstPomodoroStartedAt,
      lastPomodoroEndedAt: lastPomodoroEndedAt,
      taskTotalWorkTime: new TaskTotalWorkTime(
        new Second(taskPersistence.taskTotalWorkTimeSeconds)
      ),
    });
  },

  toView: (task: Task): TaskViewDto => {
    return {
      id: task.id.value,
      name: task.title.value,
      projectId: task.projectId.value,
      pomodoroConfiguration: PomodoroConfigurationMapper.toViewDto(
        task.pomodoroConfiguration
      ),
      isFirstPomodoroStarted: task.isFirstPomodoroStarted(),
      firstPomodoroStartedAt: task.firstPomodoroStartedAt?.value,
      lastPomodoroEndedAt: task.lastPomodoroEndedAt?.value,
      taskTotalWorkTime: TaskTotalWorkTimeMapper.toViewDto(
        task.taskTotalWorkTime
      ),
    };
  },

  fromView: (taskView: TaskViewDto): Task => {
    const { pomodoroConfiguration } = taskView;
    return new Task({
      id: new TaskId(taskView.id),
      title: new TaskTitle(taskView.name),
      projectId: new ProjectId(taskView.projectId),
      pomodoroConfiguration: PomodoroConfigurationMapper.fromViewDto(
        pomodoroConfiguration
      ),
      taskTotalWorkTime: new TaskTotalWorkTime(
        new Second(taskView.taskTotalWorkTime.seconds)
      ),
    });
  },
};
