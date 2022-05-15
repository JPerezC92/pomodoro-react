import { SessionCounter } from "@/pomodoro/domain/SessionCounter";
import {
  PomodoroConfigurationDomainToPersistence,
  PomodoroConfigurationDomainToView,
  PomodoroConfigurationPersistenceToDomain,
} from "@/pomodoro/infrastructure/mappers/PomodoroConfigurationMapper";
import { ProjectId } from "@/projects/domain/ProjectId";
import { TimeSpent } from "@/shared/domain/TimeSpent";
import { TimeSpentDomainToView } from "@/shared/infrastructure/mappers/TimeSpentMapper";
import { FirstPomodoroStartedAt } from "@/tasks/domain/FirstPomodoroStartedAt";
import { LastPomodoroEndedAt } from "@/tasks/domain/LastPomodoroEndedAt";
import { Second } from "@/tasks/domain/Second";
import { Task } from "@/tasks/domain/Task";
import { TaskId } from "@/tasks/domain/TaskId";
import { TaskIsDone } from "@/tasks/domain/TaskIsDone";
import { TaskTitle } from "@/tasks/domain/TaskTitle";
import { TaskDetailViewDto } from "@/tasks/infrastructure/dto/task-detail-view.dto";
import { TaskPersistenceDto } from "@/tasks/infrastructure/dto/task-persistence.dto";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";
import { TaskHistoryView } from "../dto/taskHistoryView.dto";

export function TaskDomainToPersistence(task: Task): TaskPersistenceDto {
  return {
    id: task.id.value,
    name: task.title.value,
    projectId: task.projectId?.value,
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
}

export function TaskPersistenceToDomain(
  taskPersistence: TaskPersistenceDto
): Task {
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
}

export function TaskDomainToView(task: Task): TaskViewDto {
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
    totalTimeSpent: TimeSpentDomainToView(task.totalTimeSpent()),
    isDone: task.isDone.value,
    createdAt: task.createdAt,
    sessionsCount: task.sessionsCount.value,
  };
}

export function TaskViewToDetailList(
  taskView: TaskViewDto
): TaskDetailViewDto[] {
  const { totalTimeSpent: totalWorkTime, pomodoroConfiguration } = taskView;

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
}

export function TaskDomainToHistoryView(taskList: Task[]): TaskHistoryView[] {
  let datesHelperList: string[] = [];

  const taskHistory: TaskHistoryView[] = taskList
    .filter((task) => {
      const isDifferentDate =
        !!task.lastPomodoroEndedAt &&
        !datesHelperList.includes(
          task.lastPomodoroEndedAt.value.toLocaleDateString()
        );
      if (task.lastPomodoroEndedAt) {
        datesHelperList = [
          ...datesHelperList,
          task.lastPomodoroEndedAt.value.toLocaleDateString(),
        ];
      }

      return isDifferentDate;
    })
    .map((task) => ({
      results: taskList
        .filter(
          (t) =>
            t.lastPomodoroEndedAt?.value.toLocaleDateString() ===
            task.lastPomodoroEndedAt?.value.toLocaleDateString()
        )
        .sort(
          (a, b) =>
            (b.lastPomodoroEndedAt?.value.getTime() as number) -
            (a.lastPomodoroEndedAt?.value.getTime() as number)
        )
        .map(TaskDomainToView),
      lastPomodoroEndedAt: task.lastPomodoroEndedAt?.value as Date,
      lastPomodoroEndedAtLocaleDate:
        task.lastPomodoroEndedAt?.value.toLocaleDateString() as string,
    }));

  return taskHistory;
}
