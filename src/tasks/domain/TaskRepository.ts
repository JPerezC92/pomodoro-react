import { Task } from "./Task";

export interface TaskRepository {
  delete: (taskId: string) => Promise<void>;
  findAll: () => Promise<Task[]>;
  findAllWithoutProject: () => Promise<Task[]>;
  findById: (props: { id: string }) => Promise<Task | undefined>;
  findByProjectId: (props: { projectId: string }) => Promise<Task[]>;
  findNextTask: (currentTaskId: string) => Promise<Task | undefined>;
  persist: (task: Task) => Promise<void>;
  update: (task: Task) => Promise<void>;
}
