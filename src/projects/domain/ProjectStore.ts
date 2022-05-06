import { Project } from "./Project";

export interface ProjectStore {
  updateProject: (project: Project) => void;
  projectNotFound: () => void;
}
