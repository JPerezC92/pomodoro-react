import { Project } from "./Project";

export interface ProjectListStore {
  updateProjects: (projectList: Project[]) => void;
}
