import { PomodoroDB } from "@/shared/infrastructure/db/connection";
import { Task } from "../domain/Task";
import { TaskRepository } from "../domain/TaskRepository";
import { TaskPersistenceDto } from "./dto/task-persistence.dto";
import { TaskMapper } from "./TaskMapper";

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
  };
};
