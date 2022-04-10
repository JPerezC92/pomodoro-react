import { Task } from "../domain/Task";

export interface TaskStore {
  updateTasks: (tasks: Task[]) => void;
}
