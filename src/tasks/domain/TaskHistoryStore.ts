import { Task } from "./Task";

export interface TaskHistoryStore {
  updateTaskHistoryList(taskList: Task[]): void;
}
