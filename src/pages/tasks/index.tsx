import { NextPage } from "next";

import { TasksScreen } from "@/tasks/infrastructure/screens/TasksScreen";

const TasksPage: NextPage = () => {
  return (
    <>
      <TasksScreen />
    </>
  );
};

export default TasksPage;
