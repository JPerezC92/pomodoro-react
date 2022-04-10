import { PomodoroDB } from "@/shared/infrastructure/db/connection";
import { Project } from "../domain/Project";
import { ProjectRepository } from "../domain/ProjectRepository";
import { ProjectMapper } from "./ProjectMapper";

export const DexieProjectRepository: (props: {
  db: PomodoroDB;
}) => ProjectRepository = ({ db }) => {
  return {
    persist: async (project: Project): Promise<void> => {
      await db.project.add(ProjectMapper.toPersistence(project));
    },

    findAll: async (): Promise<Project[]> => {
      const projects = await db.project.toArray();
      return projects.map(ProjectMapper.fromPersistence);
    },
  };
};
