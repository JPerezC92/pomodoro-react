import { PomodoroConfigurationMapper } from "@/pomodoro/infrastructure/mappers/PomodoroConfigurationMapper";
import { ProjectId } from "@/projects/domain/ProjectId";
import { FirstPomodoroStartedAt } from "@/tasks/domain/FirstPomodoroStartedAt";
import { LastPomodoroEndedAt } from "@/tasks/domain/LastPomodoroEndedAt";
import { Second } from "@/tasks/domain/Second";
import { Task } from "@/tasks/domain/Task";
import { TaskId } from "@/tasks/domain/TaskId";
import { TaskIsDone } from "@/tasks/domain/TaskIsDone";
import { TaskTitle } from "@/tasks/domain/TaskTitle";
import { TaskTotalWorkTime } from "@/tasks/domain/TaskTotalWorkTime";
import { TaskDetailViewDto } from "@/tasks/infrastructure/dto/task-detail-view.dto";
import { TaskPersistenceDto } from "@/tasks/infrastructure/dto/task-persistence.dto";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";
import { TaskTotalWorkTimeMapper } from "./TaskTotalWorkTimeMapper";

export const TaskMapper = {
  toPersistence: (task: Task): TaskPersistenceDto => {
    return {
      id: task.id.value,
      name: task.title.value,
      projectId: task.projectId?.value || undefined,
      firstPomodoroStartedAt: task.firstPomodoroStartedAt?.value,
      lastPomodoroEndedAt: task.lastPomodoroEndedAt?.value,
      lastPomodoroEndedAtLocaleDate:
        task.lastPomodoroEndedAt?.value.toLocaleDateString(),
      taskTotalWorkTimeSeconds: task.totalWorkTime.value.value,
      isDone: task.isDone.value,
      pomodoroConfiguration: PomodoroConfigurationMapper.toPersistence(
        task.pomodoroConfiguration
      ),
      createdAt: task.createdAt,
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
      projectId: taskPersistence.projectId
        ? new ProjectId(taskPersistence.projectId)
        : undefined,
      firstPomodoroStartedAt: firstPomodoroStartedAt,
      lastPomodoroEndedAt: lastPomodoroEndedAt,
      totalWorkTime: new TaskTotalWorkTime(
        new Second(taskPersistence.taskTotalWorkTimeSeconds)
      ),
      isDone: new TaskIsDone(taskPersistence.isDone),
      pomodoroConfiguration: PomodoroConfigurationMapper.fromPersistence(
        taskPersistence.pomodoroConfiguration
      ),
      createdAt: taskPersistence.createdAt,
    });
  },

  toView: (task: Task): TaskViewDto => {
    return {
      id: task.id.value,
      name: task.title.value,
      projectId: task.projectId?.value,
      pomodoroConfiguration: PomodoroConfigurationMapper.toViewDto(
        task.pomodoroConfiguration
      ),
      isFirstPomodoroStarted: task.isFirstPomodoroStarted(),
      firstPomodoroStartedAt: task.firstPomodoroStartedAt?.value,
      lastPomodoroEndedAt: task.lastPomodoroEndedAt?.value,
      totalWorkTime: TaskTotalWorkTimeMapper.toViewDto(task.totalWorkTime),
      isDone: task.isDone.value,
      createdAt: task.createdAt,
    };
  },

  fromView: (taskView: TaskViewDto): Task => {
    const { pomodoroConfiguration } = taskView;
    return new Task({
      id: new TaskId(taskView.id),
      title: new TaskTitle(taskView.name),
      projectId: taskView.projectId
        ? new ProjectId(taskView.projectId)
        : undefined,
      pomodoroConfiguration: PomodoroConfigurationMapper.fromViewDto(
        pomodoroConfiguration
      ),
      totalWorkTime: new TaskTotalWorkTime(
        new Second(taskView.totalWorkTime.seconds)
      ),
      isDone: new TaskIsDone(taskView.isDone),
      createdAt: taskView.createdAt,
    });
  },

  toDetails: (taskView: TaskViewDto): TaskDetailViewDto[] => {
    const { totalWorkTime, pomodoroConfiguration } = taskView;

    return [
      {
        label: "Time",
        value: `${totalWorkTime.hours}:${
          totalWorkTime.minutes > 10
            ? totalWorkTime.minutes
            : "0" + totalWorkTime.minutes
        } hours`,
      },
      {
        label: "Focus",
        value: `${pomodoroConfiguration.focusTimeMinutes} min`,
      },
      {
        label: "Short Break",
        value: `${pomodoroConfiguration.breakTimeMinutes} min`,
      },
      {
        label: "Long Break",
        value: `${pomodoroConfiguration.longBreakTimeMinutes} min`,
      },
      {
        label: "First Pomodoro",
        value: taskView.firstPomodoroStartedAt?.toLocaleDateString(),
      },
      {
        label: "Last Pomodoro",
        value: taskView.lastPomodoroEndedAt?.toLocaleDateString(),
      },
    ];
  },
};
