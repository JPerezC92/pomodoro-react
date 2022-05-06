import { appUrl } from "@/shared/infrastructure/utils/config";

export const ProjectRoutes = {
  projects: `${appUrl}/projects`,
  project: (id: string) => `${appUrl}/projects/${id}`,
  projectDetail: (id: string) => `${appUrl}/projects/${id}`,
  settings: (id: string) => `${appUrl}/projects/${id}/settings`,
};
