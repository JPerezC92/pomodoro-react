import { useCallback } from "react";

import { ProjectFindById } from "@/projects/application/ProjectFindById";
import { ProjectStore } from "@/projects/domain/ProjectStore";
import { DexieProjectRepository } from "@/projects/infrastructure/DexieProject.repository";
import { useUow } from "@/shared/infrastructure/db/Uow";

export const useProjectFindById = (projectStore: ProjectStore) => {
  const { db, transaction, isLoading } = useUow();

  const projectFindByIdRun = useCallback(
    async (props: { projectId: string }) =>
      await transaction([db.project, db.task], async () => {
        const projectFindById = ProjectFindById({
          projectRepository: DexieProjectRepository({ db }),
          projectStore,
        });

        await projectFindById.execute({ projectId: props.projectId });
      }),
    [db, projectStore, transaction]
  );
  return {
    projectFindByIdRun,
    isLoading,
  };
};
