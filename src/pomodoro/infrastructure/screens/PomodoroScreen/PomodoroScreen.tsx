import { FC, useEffect } from "react";

import { PomodoroContainer } from "@/pomodoro/infrastructure/components/PomodoroContainer";
import { Layout } from "@/shared/infrastructure/components/Layout";
import { SpinnerFullScreen } from "@/shared/infrastructure/components/SpinnerFullScreen";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { useTaskFindById } from "@/tasks/infrastructure/hooks/useFindTaskById";

type PomodoroScreenProps = {};

export const PomodoroScreen: FC<PomodoroScreenProps> = (props) => {
  const { isParsing, queryParams } = usePullQueryString({ taskId: "taskId" });
  const { taskId } = queryParams;
  const { task, taskFindByIdRun, isLoading } = useTaskFindById();

  const isLoadingPomodoroScreen = !taskId || isParsing || isLoading || !task;
  const canRunTaskFinder = !!taskId && !isParsing;

  useEffect(() => {
    if (canRunTaskFinder) taskFindByIdRun({ taskId });
  }, [canRunTaskFinder, taskFindByIdRun, taskId]);

  if (isLoadingPomodoroScreen) return <SpinnerFullScreen />;

  return (
    <>
      <Layout title="Pomodoro Timer">
        <PomodoroContainer task={task} />
      </Layout>
    </>
  );
};
