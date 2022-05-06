import { useCallback } from "react";

import { ProjectFindAll } from "@/projects/application/ProjectFindAll";
import { ProjectListStore } from "@/projects/domain/ProjectListStore";
import { DexieProjectRepository } from "@/projects/infrastructure/DexieProject.repository";
import { useUow } from "@/shared/infrastructure/db/Uow";

export const useProjectsFindAll = (projectStore: ProjectListStore) => {
  const { db, transaction, isLoading } = useUow();

  const projectsFindAllRun = useCallback(() => {
    const projectFindAll = ProjectFindAll({
      projectRepository: DexieProjectRepository({ db }),
      projectStore,
    });
    return transaction([db.project, db.task], () => projectFindAll.execute());
  }, [db, projectStore, transaction]);
  return {
    projectsFindAllRun,
    isLoading,
  };
};
