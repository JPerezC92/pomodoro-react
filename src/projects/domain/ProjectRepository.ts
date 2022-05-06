import { Project } from "./Project";

export interface ProjectRepository {
  findAll(): Promise<Project[]>;
  persist(project: Project): Promise<void>;
  findById(id: string): Promise<Project | undefined>;
}
