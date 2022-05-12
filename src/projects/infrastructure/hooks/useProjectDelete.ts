import React from "react";

import { ProjectDelete } from "@/projects/application/ProjectDelete";
import { DexieProjectRepository } from "@/projects/infrastructure/DexieProject.repository";
import { useUow } from "@/shared/infrastructure/db/Uow";

export const useProjectDelete = () => {
  const { db, isLoading, transaction } = useUow();

  const projectDeleteRun = React.useCallback(
    async (props: { projectId: string }) =>
      await transaction([db.task, db.project], async () => {
        const projectDelete = ProjectDelete({
          projectRepository: DexieProjectRepository({ db }),
        });

        await projectDelete.execute({ projectId: props.projectId });
      }),
    [db, transaction]
  );

  return {
    projectDeleteRun,
    isLoading,
  };
};
