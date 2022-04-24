import { Task } from "./Task";

export interface TaskListStore {
  updateTaskList: (taskList: Task[]) => void;
}
