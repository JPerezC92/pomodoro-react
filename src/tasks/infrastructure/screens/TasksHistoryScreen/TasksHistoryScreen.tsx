import { FC, useEffect } from "react";

import { useTaskFindHistory } from "@/tasks/infrastructure/hooks/useTaskFindHistory";
import { Layout } from "@/shared/infrastructure/components/Layout";

type TasksHistoryScreenProps = {};

export const TasksHistoryScreen: FC<TasksHistoryScreenProps> = (props) => {
  const { taskHistoryList, taskFindHistoryRun } = useTaskFindHistory();

  useEffect(() => {
    taskFindHistoryRun();
  }, [taskFindHistoryRun]);

  return (
    <>
      <Layout title="History">
        <ul>
          {taskHistoryList.map(({ lastPomodoroEndedAtLocaleDate, results }) => (
            <li key={lastPomodoroEndedAtLocaleDate}>
              <div>
                <h2>{lastPomodoroEndedAtLocaleDate}</h2>
                <ul>
                  {results.map((result) => (
                    <li key={result.id}>
                      <h3>{result.name}</h3>
                      <p>
                        Total time: {result.taskTotalWorkTime.hours} hours{" "}
                        {result.taskTotalWorkTime.minutes} minutes
                      </p>

                      <p>
                        firstPomodoroStartedAt:{" "}
                        {result.firstPomodoroStartedAt?.toDateString()}{" "}
                        {result.firstPomodoroStartedAt?.toTimeString()}
                      </p>

                      <p>
                        lastPomodoroEndedAt:{" "}
                        {result.lastPomodoroEndedAt?.toDateString()}{" "}
                        {result.lastPomodoroEndedAt?.toTimeString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
};
