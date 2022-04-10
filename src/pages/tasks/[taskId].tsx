import { NextPage } from "next";

import { TaskScreen } from "@/tasks/infrastructure/screens/TaskScreen";

const TaskPage: NextPage = () => {
  return (
    <>
      <TaskScreen />
    </>
  );
};

export default TaskPage;
