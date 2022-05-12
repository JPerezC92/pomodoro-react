import { Project } from "@/projects/domain/Project";
import { ProjectRepository } from "@/projects/domain/ProjectRepository";
import { ProjectMapper } from "@/projects/infrastructure/mappers/ProjectMapper";
import { PomodoroDB } from "@/shared/infrastructure/db/connection";

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

    findById: async (projectId: string): Promise<Project | undefined> => {
      const project = await db.project.where("id").equals(projectId).first();

      if (!project) return;

      const taskList = (
        await db.task.where("projectId").equals(projectId).toArray()
      ).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

      return ProjectMapper.fromPersistence({ project, taskList });
    },

    delete: async (projectId: string): Promise<void> => {
      await db.task.where("projectId").equals(projectId).delete();
      await db.project.where("id").equals(projectId).delete();
    },
  };
};
