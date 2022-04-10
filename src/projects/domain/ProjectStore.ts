import { Project } from "./Project";

export interface ProjectStore {
  updateProjects: (projects: Project[]) => void;
}
