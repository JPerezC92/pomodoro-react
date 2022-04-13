import { PomodoroConfiguration } from "@/pomodoro/domain/PomodoroConfiguration";
import { ProjectId } from "./ProjectId";
import { TaskId } from "./TaskId";
import { TaskTitle } from "./TaskTitle";

interface TaskProps {
  id: TaskId;
  title: TaskTitle;
  projectId: ProjectId;
  taskConfiguration?: PomodoroConfiguration;
}

export class Task {
  public id: TaskId;
  public title: TaskTitle;
  public projectId: ProjectId;
  public taskConfiguration: PomodoroConfiguration;

  constructor({ id, title, projectId, taskConfiguration }: TaskProps) {
    this.id = id;
    this.title = title;
    this.projectId = projectId;
    this.taskConfiguration =
      taskConfiguration || PomodoroConfiguration.default();
  }
}
