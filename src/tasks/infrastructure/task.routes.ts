import { appUrl } from "@/shared/infrastructure/utils/config";

export const TaskRoutes = {
  tasks: `${appUrl}/tasks`,
  task: (id: string) => `${appUrl}/tasks/${id}`,
};
