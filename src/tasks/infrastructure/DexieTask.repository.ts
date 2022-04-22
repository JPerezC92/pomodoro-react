import { PomodoroDB } from "@/shared/infrastructure/db/connection";
import { Task } from "@/tasks/domain/Task";
import { TaskHistory } from "@/tasks/domain/TaskHistory";
import { TaskRepository } from "@/tasks/domain/TaskRepository";
import { TaskPersistenceDto } from "@/tasks/infrastructure/dto/task-persistence.dto";
import { TaskMapper } from "@/tasks/infrastructure/mappers/TaskMapper";

export const DexieTaskRepository: (props: {
  db: PomodoroDB;
}) => TaskRepository = ({ db }) => {
  return {
    findAll: async (): Promise<Task[]> => {
      const task = await db.task.toArray();

      return task.map(TaskMapper.fromPersistence);
    },

    persist: async (task: Task): Promise<void> => {
      db.task.add(TaskMapper.toPersistence(task));
    },

    findByProjectId: async (props: { projectId: string }): Promise<Task[]> => {
      const taskPersistenceDto: TaskPersistenceDto[] = await db.task
        .where("projectId")
        .equals(props.projectId)
        .toArray();

      return taskPersistenceDto.map(TaskMapper.fromPersistence);
    },

    findById: async (props: { id: string }): Promise<Task | undefined> => {
      const taskPersistenceDto = await db.task
        .where("id")
        .equals(props.id)
        .first();

      if (!taskPersistenceDto) return;

      return TaskMapper.fromPersistence(taskPersistenceDto);
    },

    update: async (task: Task): Promise<void> => {
      await db.task
        .where("id")
        .equals(task.id.value)
        .modify({
          ...TaskMapper.toPersistence(task),
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
              .then((tasks) => tasks.map(TaskMapper.fromPersistence))
              .then((tasks) => ({
                ...date,
                results: tasks,
              }))
        )
      );

      return taskHistoryList;
    },

    findIndividuals: async (): Promise<Task[]> => {
      const taskPersistenceDtoList = await db.task
        .filter((v) => !v.projectId)
        .toArray();

      return taskPersistenceDtoList.map(TaskMapper.fromPersistence);
    },
  };
};
