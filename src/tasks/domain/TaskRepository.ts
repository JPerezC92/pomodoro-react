import { Task } from "./Task";

export interface TaskRepository {
  persist: (task: Task) => Promise<void>;
  findAll: () => Promise<Task[]>;
  findByProjectId: (props: { projectId: string }) => Promise<Task[]>;
  findById: (props: { id: string }) => Promise<Task | undefined>;
  update: (task: Task) => Promise<void>;
}
