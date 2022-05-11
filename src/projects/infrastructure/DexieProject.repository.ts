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

      return await Promise.all(
        projects.map(async (project) =>
          ProjectMapper.fromPersistence({
            project,
            taskList: await db.task
              .where("projectId")
              .equals(project.id)
              .toArray(),
          })
        )
      );
    },

    findById: async (id: string): Promise<Project | undefined> => {
      const project = await db.project.where("id").equals(id).first();

      if (!project) return;

      const taskList = (
        await db.task.where("projectId").equals(id).toArray()
      ).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

      return ProjectMapper.fromPersistence({ project, taskList });
    },
  };
};
