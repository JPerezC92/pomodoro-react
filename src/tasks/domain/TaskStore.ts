import { Task } from "./Task";

export interface TaskStore {
  updateTask: (task: Task) => void;
  taskNotFound: () => void;
}
