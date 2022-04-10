import { ProjectCreator } from "@/projects/application/ProjectCreator";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { JsUuidGenerator } from "@/shared/infrastructure/JsUuidGenerator";
import { useCallback } from "react";
import { DexieProjectRepository } from "../DexieProject.repository";

export const useProjectCreator = () => {
  const { db, transaction, isLoading } = useUow();

  const projectCreatorRun = useCallback(
    async ({ name }: { name: string }) => {
      const projectCreator = ProjectCreator({
        projectRepository: DexieProjectRepository({ db }),
      });

      return await transaction([db.project], () =>
        projectCreator.execute({ id: JsUuidGenerator().generate(), name })
      );
    },
    [db, transaction]
  );

  return {
    projectCreatorRun,
    isLoading,
  };
};
