import { Task } from "./Task";

export interface TaskStore {
  updateTasks: (tasks: Task[]) => void;
}
