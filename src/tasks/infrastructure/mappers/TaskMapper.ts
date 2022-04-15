import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
import { PomodoroConfigurationMapper } from "@/pomodoro/infrastructure/mappers/PomodoroConfigurationMapper";
import { Minute } from "@/tasks/domain/Minute";
import { ProjectId } from "@/tasks/domain/ProjectId";
import { Second } from "@/tasks/domain/Second";
import { Task } from "@/tasks/domain/Task";
import { TaskId } from "@/tasks/domain/TaskId";
import { TaskTitle } from "@/tasks/domain/TaskTitle";
import { TaskTotalWorkTime } from "@/tasks/domain/TaskTotalWorkTime";
import { FirstPomodoroStartedAt } from "../../domain/FirstPomodoroStartedAt";
import { LastPomodoroEndedAt } from "../../domain/LastPomodoroEndedAt";
import { TaskPersistenceDto } from "../dto/task-persistence.dto";
import { TaskDto } from "../dto/task.dto";
import { TaskTotalWorkTimeMapper } from "./TaskTotalWorkTimeMapper";

export const TaskMapper = {
  toPersistence: (task: Task): TaskPersistenceDto => {
    return {
      id: task.id.value,
      title: task.title.value,
      projectId: task.projectId.value,
      firstPomodoroStartedAt: task.firstPomodoroStartedAt?.value,
      lastPomodoroEndedAt: task.lastPomodoroEndedAt?.value,
      lastPomodoroEndedAtLocaleDate:
        task.lastPomodoroEndedAt?.value.toLocaleDateString(),
      taskTotalWorkTimeSeconds: task.taskTotalWorkTime.value.value,
    };
  },

  fromPersistence: (task: TaskPersistenceDto): Task => {
    let firstPomodoroStartedAt: FirstPomodoroStartedAt | undefined;
    let lastPomodoroEndedAt: LastPomodoroEndedAt | undefined;

    if (task.firstPomodoroStartedAt) {
      firstPomodoroStartedAt = new FirstPomodoroStartedAt(
        task.firstPomodoroStartedAt
      );
    }

    if (task.lastPomodoroEndedAt) {
      lastPomodoroEndedAt = new FirstPomodoroStartedAt(
        task.lastPomodoroEndedAt
      );
    }

    return new Task({
      id: new TaskId(task.id),
      title: new TaskTitle(task.title),
      projectId: new ProjectId(task.projectId),
      firstPomodoroStartedAt: firstPomodoroStartedAt,
      lastPomodoroEndedAt: lastPomodoroEndedAt,
      taskTotalWorkTime: new TaskTotalWorkTime(
        new Second(task.taskTotalWorkTimeSeconds)
      ),
    });
  },

  toTaskDto: (task: Task): TaskDto => {
    return {
      id: task.id.value,
      title: task.title.value,
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

  fromTaskDto: (taskDto: TaskDto): Task => {
    const { pomodoroConfiguration } = taskDto;
    return new Task({
      id: new TaskId(taskDto.id),
      title: new TaskTitle(taskDto.title),
      projectId: new ProjectId(taskDto.projectId),
      pomodoroConfiguration: PomodoroConfigurationMapper.fromViewDto(
        pomodoroConfiguration
      ),
      taskTotalWorkTime: new TaskTotalWorkTime(
        new Second(taskDto.taskTotalWorkTime.seconds)
      ),
    });
  },
};
