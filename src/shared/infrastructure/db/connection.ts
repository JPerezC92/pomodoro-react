import Dexie, { Table } from "dexie";

import { ProjectPersistenceDto } from "@/projects/infrastructure/dto/project-persistence.dto";
import { TaskPersistenceDto } from "@/tasks/infrastructure/dto/task-persistence.dto";

export class PomodoroDB extends Dexie {
  task!: Table<TaskPersistenceDto, number>;
  project!: Table<ProjectPersistenceDto, number>;
  constructor() {
    super("pomodoroDB");
    this.version(1).stores({
      task: "++id, projectId, lastPomodoroEndedAt, lastPomodoroEndedAtLocaleDate, createdAt",
      project: "++id",
    });
  }
}

export const db = new PomodoroDB();
