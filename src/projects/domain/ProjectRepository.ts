import { Project } from "./Project";

export interface ProjectRepository {
  findAll(): Promise<Project[]>;
  persist(project: Project): Promise<void>;
  findById(projectId: string): Promise<Project | undefined>;
  delete(projectId: string): Promise<void>;
}
