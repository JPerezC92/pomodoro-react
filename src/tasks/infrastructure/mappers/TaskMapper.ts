import { SessionCounter } from "@/pomodoro/domain/SessionCounter";
import {
  PomodoroConfigurationDomainToPersistence,
  PomodoroConfigurationDomainToView,
  PomodoroConfigurationPersistenceToDomain,
} from "@/pomodoro/infrastructure/mappers/PomodoroConfigurationMapper";
import { ProjectId } from "@/projects/domain/ProjectId";
import { FirstPomodoroStartedAt } from "@/tasks/domain/FirstPomodoroStartedAt";
import { LastPomodoroEndedAt } from "@/tasks/domain/LastPomodoroEndedAt";
import { Second } from "@/tasks/domain/Second";
import { Task } from "@/tasks/domain/Task";
import { TaskId } from "@/tasks/domain/TaskId";
import { TaskIsDone } from "@/tasks/domain/TaskIsDone";
import { TaskTitle } from "@/tasks/domain/TaskTitle";
import { TimeSpent } from "@/tasks/domain/TaskTotalWorkTime";
import { TaskDetailViewDto } from "@/tasks/infrastructure/dto/task-detail-view.dto";
import { TaskPersistenceDto } from "@/tasks/infrastructure/dto/task-persistence.dto";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";
import { TaskTotalWorkTimeMapper } from "@/tasks/infrastructure/mappers/TaskTotalWorkTimeMapper";

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
      focusSpentTimeSeconds: task.focusTimeSpend.value.value,
      breakSpentTimeSeconds: task.breakTimeSpend.value.value,
      isDone: task.isDone.value,
      pomodoroConfiguration: PomodoroConfigurationDomainToPersistence(
        task.pomodoroConfiguration
      ),
      createdAt: task.createdAt,
      sessionsCount: task.sessionsCount.value,
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
      focusTimeSpend: new TimeSpent(
        new Second(taskPersistence.focusSpentTimeSeconds)
      ),
      breakTimeSpend: new TimeSpent(
        new Second(taskPersistence.breakSpentTimeSeconds)
      ),
      isDone: new TaskIsDone(taskPersistence.isDone),
      pomodoroConfiguration: PomodoroConfigurationPersistenceToDomain(
        taskPersistence.pomodoroConfiguration
      ),
      createdAt: taskPersistence.createdAt,
      sessionsCount: new SessionCounter(taskPersistence.sessionsCount),
    });
  },

  toView: (task: Task): TaskViewDto => {
    return {
      id: task.id.value,
      name: task.title.value,
      projectId: task.projectId?.value,
      pomodoroConfiguration: PomodoroConfigurationDomainToView(
        task.pomodoroConfiguration
      ),
      isFirstPomodoroStarted: task.isFirstPomodoroStarted(),
      firstPomodoroStartedAt: task.firstPomodoroStartedAt?.value,
      lastPomodoroEndedAt: task.lastPomodoroEndedAt?.value,
      totalWorkTime: TaskTotalWorkTimeMapper.toViewDto(task.focusTimeSpend),
      isDone: task.isDone.value,
      createdAt: task.createdAt,
      sessionsCount: task.sessionsCount.value,
    };
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
