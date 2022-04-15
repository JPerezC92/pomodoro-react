import { Task } from "./Task";
import { TaskHistory } from "./TaskHistory";

export interface TaskRepository {
  findAll: () => Promise<Task[]>;
  findById: (props: { id: string }) => Promise<Task | undefined>;
  findByProjectId: (props: { projectId: string }) => Promise<Task[]>;
  history: () => Promise<TaskHistory[]>;
  persist: (task: Task) => Promise<void>;
  update: (task: Task) => Promise<void>;
}
