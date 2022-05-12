import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";
import { ProjectBaseDto } from "./project-base.dto";

export interface ProjectViewDto extends ProjectBaseDto {
  id: string;
  taskList: TaskViewDto[];
  isDone: boolean;
  totalTimeSpent: { hours: number; minutes: number };
  focusTimeSpent: { hours: number; minutes: number };
  breakTimeSpent: { hours: number; minutes: number };
}
