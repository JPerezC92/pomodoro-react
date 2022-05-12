import { ProjectDetailViewDto } from "@/projects/infrastructure/dto/project-detail-view-dto";
import { ProjectViewDto } from "@/projects/infrastructure/dto/project.dto";

export function ProjectDetailsMapper(
  projectViewDto: ProjectViewDto
): ProjectDetailViewDto[] {
  return [
    {
      label: "Total time spent",
      value: `${projectViewDto.totalTimeSpent.hours} hrs ${projectViewDto.totalTimeSpent.minutes} mins`,
    },
    {
      label: "Focus time spent",
      value: `${projectViewDto.focusTimeSpent.hours} hrs ${projectViewDto.focusTimeSpent.minutes} mins`,
    },
    {
      label: "Break time spent",
      value: `${projectViewDto.breakTimeSpent.hours} hrs ${projectViewDto.breakTimeSpent.minutes} mins`,
    },
  ];
}
