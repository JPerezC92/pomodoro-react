import { PomodoroDB } from "@/shared/infrastructure/db/connection";
import { Task } from "@/tasks/domain/Task";
import { TaskHistory } from "@/tasks/domain/TaskHistory";
import { TaskRepository } from "@/tasks/domain/TaskRepository";
import { TaskPersistenceDto } from "@/tasks/infrastructure/dto/task-persistence.dto";
import {
  TaskDomainToPersistence,
  TaskPersistenceToDomain,
} from "@/tasks/infrastructure/mappers/TaskMapper";

export const DexieTaskRepository: (props: {
  db: PomodoroDB;
}) => TaskRepository = ({ db }) => {
  return {
    findAll: async (projectId?: string): Promise<Task[]> => {
      const taskList = await db.task
        .orderBy("createdAt")
        .filter((task) => task.projectId === projectId)
        .toArray();

      return taskList.map(TaskPersistenceToDomain);
    },

    findNextTask: async (currentTaskId: string): Promise<Task | undefined> => {
      const currentTask = await db.task
        .where("id")
        .equals(currentTaskId)
        .first();

      if (!currentTask) return;

      const taskList = await db.task
        .orderBy("createdAt")
        .filter((t) => t.projectId === currentTask.projectId)
        .toArray();

      const currentTaskIndex = taskList.findIndex(
        (t) => t.id === currentTaskId
      );

      if (currentTaskIndex === -1) return;

      const nextTask = taskList[currentTaskIndex + 1];

      if (!nextTask) return;

      return TaskPersistenceToDomain(nextTask);
    },

    persist: async (task: Task): Promise<void> => {
      db.task.add(TaskDomainToPersistence(task));
    },

    findByProjectId: async (props: { projectId: string }): Promise<Task[]> => {
      const taskPersistenceDto: TaskPersistenceDto[] = await db.task
        .orderBy("createdAt")
        .filter((t) => t.projectId === props.projectId)
        .toArray();

      return taskPersistenceDto.map(TaskPersistenceToDomain);
    },

    findById: async (props: { id: string }): Promise<Task | undefined> => {
      const taskPersistenceDto = await db.task
        .where("id")
        .equals(props.id)
        .first();

      if (!taskPersistenceDto) return;

      return TaskPersistenceToDomain(taskPersistenceDto);
    },

    update: async (task: Task): Promise<void> => {
      await db.task
        .where("id")
        .equals(task.id.value)
        .modify({
          ...TaskDomainToPersistence(task),
        });
    },

    history: async (): Promise<TaskHistory[]> => {
      const datesFilterHelper: string[] = [];
      const dates = await db.task
        .orderBy("lastPomodoroEndedAt")
        .reverse()
        .filter((taskPersistenceDto) => {
          if (!taskPersistenceDto.lastPomodoroEndedAtLocaleDate) return false;
          const date = taskPersistenceDto.lastPomodoroEndedAtLocaleDate;
          if (datesFilterHelper.includes(date)) return false;
          datesFilterHelper.push(date);
          return true;
        })
        .offset(0)
        // .limit(2)
        .toArray()
        .then((taskPersistenceDtoList) =>
          taskPersistenceDtoList.map((v) => ({
            lastPomodoroEndedAt: v.lastPomodoroEndedAt as Date,
            lastPomodoroEndedAtLocaleDate:
              v.lastPomodoroEndedAtLocaleDate as string,
          }))
        );

      const taskHistoryList: TaskHistory[] = await Promise.all(
        dates.map(
          async (date) =>
            await db.task
              .orderBy("lastPomodoroEndedAt")
              .reverse()
              .filter(
                (v) =>
                  v.lastPomodoroEndedAtLocaleDate ===
                  date.lastPomodoroEndedAtLocaleDate
              )
              .toArray()
              .then((tasks) => tasks.map(TaskPersistenceToDomain))
              .then((tasks) => ({
                ...date,
                results: tasks,
              }))
        )
      );

      return taskHistoryList;
    },

    delete: async (taskId: string): Promise<void> => {
      await db.task.where("id").equals(taskId).delete();
    },
  };
};
