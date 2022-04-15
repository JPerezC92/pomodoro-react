import { TaskBaseDto } from "./task-base.dto";

export interface TaskPersistenceDto extends TaskBaseDto {
  id: string;
  projectId: string;
  firstPomodoroStartedAt?: Date;
  lastPomodoroEndedAt?: Date;
  lastPomodoroEndedAtLocaleDate?: string;
  taskTotalWorkTimeSeconds: number;
}
