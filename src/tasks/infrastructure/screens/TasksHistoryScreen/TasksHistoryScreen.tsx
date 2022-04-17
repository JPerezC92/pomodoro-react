import { FC, useEffect } from "react";

import { useTaskFindHistory } from "@/tasks/infrastructure/hooks/useTaskFindHistory";

type TasksHistoryScreenProps = {};

export const TasksHistoryScreen: FC<TasksHistoryScreenProps> = (props) => {
  const { taskHistoryList, taskFindHistoryRun } = useTaskFindHistory();

  useEffect(() => {
    taskFindHistoryRun();
  }, [taskFindHistoryRun]);

  return (
    <>
      <h1>TasksHistoryScreen</h1>

      <ul>
        {taskHistoryList.map(({ lastPomodoroEndedAtLocaleDate, results }) => (
          <li key={lastPomodoroEndedAtLocaleDate}>
            <div>
              <h2>{lastPomodoroEndedAtLocaleDate}</h2>
              <ul>
                {results.map((result) => (
                  <li key={result.id}>
                    <h3>{result.title}</h3>
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
    </>
  );
};
