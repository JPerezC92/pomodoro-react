import { ProjectFindAll } from "@/projects/application/ProjectFindAll";
import { ProjectStore } from "@/projects/domain/ProjectStore";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { useCallback } from "react";
import { DexieProjectRepository } from "../DexieProject.repository";

export const useProjectsFindAll = (projectStore: ProjectStore) => {
  const { db, transaction, isLoading } = useUow();

  const projectsFindAllRun = useCallback(() => {
    const projectFindAll = ProjectFindAll({
      projectRepository: DexieProjectRepository({ db }),
      projectStore,
    });
    return transaction([db.project], () => projectFindAll.execute());
  }, [db, projectStore, transaction]);
  return {
    projectsFindAllRun,
    isLoading,
  };
};
