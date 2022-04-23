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
import { TaskDetailViewDto } from "../dto/task-detail-view.dto";

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
      projectId: taskPersistence.projectId
        ? new ProjectId(taskPersistence.projectId)
        : undefined,
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
      projectId: task.projectId?.value,
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
      projectId: taskView.projectId
        ? new ProjectId(taskView.projectId)
        : undefined,
      pomodoroConfiguration: PomodoroConfigurationMapper.fromViewDto(
        pomodoroConfiguration
      ),
      taskTotalWorkTime: new TaskTotalWorkTime(
        new Second(taskView.taskTotalWorkTime.seconds)
      ),
    });
  },

  toDetails: (taskView: TaskViewDto): TaskDetailViewDto[] => {
    const { taskTotalWorkTime } = taskView;

    return [
      {
        label: "Time",
        value: `${taskTotalWorkTime.hours}:${
          taskTotalWorkTime.minutes > 10
            ? taskTotalWorkTime.minutes
            : "0" + taskTotalWorkTime.minutes
        }`,
      },
      {
        label: "Focus",
        value: taskView.pomodoroConfiguration.focussedTimeDurationMinutes,
      },
      {
        label: "Short Break",
        value: taskView.pomodoroConfiguration.breakTimeDurationMinutes,
      },
      {
        label: "Long Break",
        value: taskView.pomodoroConfiguration.longBreakTimeDurationMinutes,
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
