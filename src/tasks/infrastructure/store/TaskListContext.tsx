import { createContext, FC, useContext } from "react";

import { TaskListStore } from "@/tasks/domain/TaskListStore";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";

interface TaskListContextValue {
  taskList: TaskViewDto[];
  taskListStore: TaskListStore;
}

const TaskListContext = createContext({} as TaskListContextValue);

export const useTaskListContext = () => {
  const context = useContext(TaskListContext);

  if (!context) {
    throw new Error(
      "useTaskListContext must be used within a TaskListProvider"
    );
  }

  return context;
};

export const TaskListProvider: FC<TaskListContextValue> = ({
  children,
  taskList,
  taskListStore,
}) => {
  return (
    <TaskListContext.Provider value={{ taskList, taskListStore }}>
      {children}
    </TaskListContext.Provider>
  );
};
