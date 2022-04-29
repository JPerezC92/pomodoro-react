import { FC, useEffect } from "react";

import { PomodoroContainer } from "@/pomodoro/infrastructure/components/PomodoroContainer";
import { Layout } from "@/shared/infrastructure/components/Layout";
import { SpinnerFullScreen } from "@/shared/infrastructure/components/SpinnerFullScreen";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { useTaskFindById } from "@/tasks/infrastructure/hooks/useFindTaskById";
import { useTaskState } from "@/tasks/infrastructure/store/useTaskState";
import { NOT_FOUND } from "@/shared/infrastructure/utils/constants";
import { Redirect } from "@/shared/infrastructure/components/Redirect";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";

type PomodoroScreenProps = {};

export const PomodoroScreen: FC<PomodoroScreenProps> = (props) => {
  const { isParsing, queryParams } = usePullQueryString({ taskId: "taskId" });
  const { taskId } = queryParams;
  const { task, taskStore } = useTaskState();
  const { taskFindByIdRun, isLoading } = useTaskFindById(taskStore);

  const isLoadingPomodoroScreen = !taskId || isParsing || isLoading || !task;
  const canRunTaskFinder = !!taskId && !isParsing;

  useEffect(() => {
    if (canRunTaskFinder) taskFindByIdRun({ taskId });
  }, [canRunTaskFinder, taskFindByIdRun, taskId]);

  if (isLoadingPomodoroScreen) return <SpinnerFullScreen />;

  if (task === NOT_FOUND) return <Redirect pathname={TaskRoutes.tasks} />;

  return (
    <>
      <Layout title="Pomodoro Timer">
        <PomodoroContainer task={task} />
      </Layout>
    </>
  );
};
