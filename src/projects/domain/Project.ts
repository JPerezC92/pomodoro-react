import { Second } from "@/tasks/domain/Second";
import { Task } from "@/tasks/domain/Task";
import { TimeSpent } from "@/tasks/domain/TaskTotalWorkTime";
import { ProjectId } from "./ProjectId";
import { ProjectName } from "./ProjectName";

interface ProjectProps {
  id: ProjectId;
  name: ProjectName;
  taskList: Task[];
}

export class Project {
  public readonly id: ProjectId;
  public readonly name: ProjectName;
  public readonly taskList: Task[];

  constructor({ id, name, taskList }: ProjectProps) {
    this.id = id;
    this.name = name;
    this.taskList = taskList;
  }

  public static createNew(
    projectProps: Omit<ProjectProps, "taskList">
  ): Project {
    return new Project({
      id: projectProps.id,
      name: projectProps.name,
      taskList: [],
    });
  }

  public totalTimeSpend(): TimeSpent {
    return this.taskList.reduce(
      (acc, task) =>
        acc.increment(
          new Second(
            task.focusTimeSpend.value.value + task.breakTimeSpend.value.value
          )
        ),
      TimeSpent.initialize()
    );
  }

  public focusTimeSpend(): TimeSpent {
    return this.taskList.reduce(
      (acc, task) => acc.increment(new Second(task.focusTimeSpend.value.value)),
      TimeSpent.initialize()
    );
  }

  public breakTimeSpend(): TimeSpent {
    return this.taskList.reduce(
      (acc, task) => acc.increment(new Second(task.breakTimeSpend.value.value)),
      TimeSpent.initialize()
    );
  }
}
