import { TaskBaseDto } from "./task-base.dto";

export interface TaskCreateDto
  extends Pick<TaskBaseDto, "name" | "projectId"> {}
