import { appUrl } from "@/shared/infrastructure/utils/config";

export const TaskRoutes = {
  tasks: `${appUrl}/tasks`,
  taskDetail: (id: string) => `${appUrl}/tasks/${id}`,
  settings: (id: string) => `${appUrl}/tasks/${id}/settings`,
  history: `${appUrl}/history/tasks`,
};
