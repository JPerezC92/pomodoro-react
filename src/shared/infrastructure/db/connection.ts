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
      task: "++id, projectId, lastPomodoroEndedAt, lastPomodoroEndedAtLocaleDate",
      project: "++id",
    });
  }
}

export const db = new PomodoroDB();

// db.project.bulkAdd([
//   {
//     id: "1",
//     name: "Project 1",
//   },
// ]);

// db.task.bulkAdd([
//   {
//     id: "3",
//     projectId: "1",
//     title: "Task 3",
//     lastPomodoroEndedAt: new Date("2022-02-14T22:48:59.345Z"),
//     lastPomodoroEndedAtLocaleDate: new Date(
//       "2022-02-14T22:48:59.345Z"
//     ).toLocaleDateString(),
//   },
//   {
//     id: "4",
//     projectId: "1",
//     title: "Task 4",
//     lastPomodoroEndedAt: new Date("2022-02-14T22:48:59.345Z"),
//     lastPomodoroEndedAtLocaleDate: new Date(
//       "2022-02-14T22:48:59.345Z"
//     ).toLocaleDateString(),
//   },
//   {
//     id: "5",
//     projectId: "1",
//     title: "Task 5",
//     lastPomodoroEndedAt: new Date("2022-03-14T22:48:59.345Z"),
//     lastPomodoroEndedAtLocaleDate: new Date(
//       "2022-03-14T22:48:59.345Z"
//     ).toLocaleDateString(),
//   },
//   {
//     id: "6",
//     projectId: "1",
//     title: "Task 6",
//     lastPomodoroEndedAt: new Date("2022-03-14T22:48:59.345Z"),
//     lastPomodoroEndedAtLocaleDate: new Date(
//       "2022-03-14T22:48:59.345Z"
//     ).toLocaleDateString(),
//   },
//   {
//     id: "1",
//     projectId: "1",
//     title: "Task 1",
//     lastPomodoroEndedAt: new Date("2022-01-14T22:48:59.345Z"),
//     lastPomodoroEndedAtLocaleDate: new Date(
//       "2022-01-14T22:48:59.345Z"
//     ).toLocaleDateString(),
//   },
//   {
//     id: "2",
//     projectId: "1",
//     title: "Task 2",
//     lastPomodoroEndedAt: new Date("2022-01-14T22:48:59.345Z"),
//     lastPomodoroEndedAtLocaleDate: new Date(
//       "2022-01-14T22:48:59.345Z"
//     ).toLocaleDateString(),
//   },
// ]);
