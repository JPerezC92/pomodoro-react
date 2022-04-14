import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
import { FirstPomodoroStartedAt } from "../domain/FirstPomodoroStartedAt";
import { LastPomodoroEndedAt } from "../domain/LastPomodoroEndedAt";
import { Minute } from "../domain/Minute";
import { ProjectId } from "../domain/ProjectId";
import { Task } from "../domain/Task";
import { TaskId } from "../domain/TaskId";
import { TaskTitle } from "../domain/TaskTitle";
import { TaskPersistenceDto } from "./dto/task-persistence.dto";
import { TaskDto } from "./dto/task.dto";

export const TaskMapper = {
  toPersistence: (task: Task): TaskPersistenceDto => {
    return {
      id: task.id.value,
      title: task.title.value,
      projectId: task.projectId.value,
      firstPomodoroStartedAt: task.firstPomodoroStartedAt?.value.toISOString(),
      lastPomodoroEndedAt: task.lastPomodoroEndedAt?.value.toISOString(),
    };
  },

  fromPersistence: (task: TaskPersistenceDto): Task => {
    const { firstPomodoroStartedAt, lastPomodoroEndedAt } = task;

    let firstPomodoroStartedAtDate: FirstPomodoroStartedAt | undefined;
    let lastPomodoroEndedAtDate: LastPomodoroEndedAt | undefined;

    if (firstPomodoroStartedAt) {
      firstPomodoroStartedAtDate = new FirstPomodoroStartedAt(
        new Date(firstPomodoroStartedAt)
      );
    }

    if (lastPomodoroEndedAt) {
      lastPomodoroEndedAtDate = new FirstPomodoroStartedAt(
        new Date(lastPomodoroEndedAt)
      );
    }

    return new Task({
      id: new TaskId(task.id),
      title: new TaskTitle(task.title),
      projectId: new ProjectId(task.projectId),
      firstPomodoroStartedAt: firstPomodoroStartedAtDate,
      lastPomodoroEndedAt: lastPomodoroEndedAtDate,
    });
  },

  toTaskDto: (task: Task): TaskDto => {
    return {
      id: task.id.value,
      title: task.title.value,
      projectId: task.projectId.value,
      taskConfiguration: {
        breakTimeDuration: task.pomodoroConfiguration.breakTimeDuration.value,
        focussedTimeDuration:
          task.pomodoroConfiguration.focussedTimeDuration.value,
        longBreakTimeDuration:
          task.pomodoroConfiguration.longBreakTimeDuration.value,
      },
      isFirstPomodoroStarted: task.isFirstPomodoroStarted(),
    };
  },

  fromTaskDto: (taskDto: TaskDto): Task => {
    const { taskConfiguration } = taskDto;
    return new Task({
      id: new TaskId(taskDto.id),
      title: new TaskTitle(taskDto.title),
      projectId: new ProjectId(taskDto.projectId),
      pomodoroConfiguration: new PomodoroConfiguration({
        breakTimeDuration: new Minute(taskConfiguration.breakTimeDuration),
        focussedTimeDuration: new Minute(
          taskConfiguration.focussedTimeDuration
        ),
        longBreakTimeDuration: new Minute(
          taskConfiguration.longBreakTimeDuration
        ),
      }),
    });
  },
};
