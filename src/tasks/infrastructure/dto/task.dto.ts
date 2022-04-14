import { TaskBaseDto } from "./task-base.dto";

export interface TaskDto extends TaskBaseDto {
  id: string;
  projectId: string;
  taskConfiguration: {
    breakTimeDuration: number;
    focussedTimeDuration: number;
    longBreakTimeDuration: number;
  };
  isFirstPomodoroStarted: boolean;
}
