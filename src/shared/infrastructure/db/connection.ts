import Dexie, { Table } from "dexie";

import { ProjectDto } from "@/projects/infrastructure/dto/project.dto";
import { TaskPersistenceDto } from "@/tasks/infrastructure/dto/task-persistence.dto";
import { ProjectPersistenceDto } from "@/projects/infrastructure/dto/project-persistence.dto";

export class PomodoroDB extends Dexie {
  task!: Table<TaskPersistenceDto, number>;
  project!: Table<ProjectPersistenceDto, number>;
  constructor() {
    super("pomodoroDB");
    this.version(1).stores({
      task: "++id, projectId",
      project: "++id",
    });
  }
}

export const db = new PomodoroDB();
