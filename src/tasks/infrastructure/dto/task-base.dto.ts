export interface TaskBaseDto {
  createdAt: Date;
  firstPomodoroStartedAt?: Date;
  isDone: boolean;
  name: string;
  projectId?: string;
  lastPomodoroEndedAt?: Date;
}
