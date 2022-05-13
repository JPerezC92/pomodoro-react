import type { NextPage } from "next";

import { Redirect } from "@/shared/infrastructure/components/Redirect";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";

const Home: NextPage = () => {
  return <Redirect pathname={TaskRoutes.tasks} />;
};

export default Home;
