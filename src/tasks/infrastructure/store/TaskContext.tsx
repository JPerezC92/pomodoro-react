import { createContext, FC, useContext } from "react";

import { TaskStore } from "@/tasks/domain/TaskStore";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task.dto";

interface TaskContextValue {
  task: TaskViewDto;
  taskStore: TaskStore;
}

const TaskContext = createContext({} as TaskContextValue);

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }

  return context;
};

type TaskProviderProps = {
  taskStore: TaskStore;
  task: TaskViewDto;
};

export const TaskProvider: FC<TaskProviderProps> = ({
  children,
  taskStore,
  task,
}) => {
  return (
    <>
      <TaskContext.Provider value={{ taskStore, task }}>
        {children}
      </TaskContext.Provider>
    </>
  );
};
