import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
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
    };
  },

  fromPersistence: (task: TaskPersistenceDto): Task => {
    return new Task({
      id: new TaskId(task.id),
      title: new TaskTitle(task.title),
      projectId: new ProjectId(task.projectId),
    });
  },

  toTaskDto: (taskDto: Task): TaskDto => {
    return {
      id: taskDto.id.value,
      title: taskDto.title.value,
      projectId: taskDto.projectId.value,
      taskConfiguration: {
        breakTimeDuration: taskDto.taskConfiguration.breakTimeDuration,
        focussedTimeDuration: taskDto.taskConfiguration.focussedTimeDuration,
        longBreakTimeDuration: taskDto.taskConfiguration.longBreakTimeDuration,
      },
    };
  },

  fromTaskDto: (taskDto: TaskDto): Task => {
    return new Task({
      id: new TaskId(taskDto.id),
      title: new TaskTitle(taskDto.title),
      projectId: new ProjectId(taskDto.projectId),
      taskConfiguration: new PomodoroConfiguration({
        breakTimeDuration: new Minute(
          taskDto.taskConfiguration.breakTimeDuration
        ),
        focussedTimeDuration: new Minute(
          taskDto.taskConfiguration.focussedTimeDuration
        ),
        longBreakTimeDuration: new Minute(
          taskDto.taskConfiguration.longBreakTimeDuration
        ),
      }),
    });
  },
};
