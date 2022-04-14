import { TaskBaseDto } from "./task-base.dto";

export interface TaskPersistenceDto extends TaskBaseDto {
  id: string;
  projectId: string;
  firstPomodoroStartedAt?: string;
  lastPomodoroEndedAt?: string;
}
