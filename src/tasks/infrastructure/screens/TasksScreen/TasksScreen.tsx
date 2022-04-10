import { FC, useEffect } from "react";
import Link from "next/link";

import { TaskCreateDto } from "@/tasks/infrastructure/dto/task-create.dto";
import { useForm } from "@/shared/infrastructure/hooks/useForm";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { useTaskCreator } from "@/tasks/infrastructure/hooks/useTaskCreator";
import { useTaskLocalStore } from "../../hooks/useTaskLocalStore";
import { useTaskFindByProject } from "../../hooks/useTaskFindByProject";
import { TaskRoutes } from "../../task.routes";
import { PomodoroRoutes } from "src/pomodoro/infrastructure/pomodoro.routes";

type TasksScreenProps = {};

export const TasksScreen: FC<TasksScreenProps> = (props) => {
  const { queryParams, isParsing } = usePullQueryString({
    projectId: "projectId",
  });
  const { tasks, taskStore } = useTaskLocalStore();

  const { taskCreatorRun } = useTaskCreator();
  const { taskFindByProjectRun } = useTaskFindByProject(taskStore);

  const { values, handleChange, handleSubmit } = useForm<TaskCreateDto>({
    initialValues: {
      title: "",
    },

    onSubmit: (values, clearValues) => {
      if (!queryParams.projectId) return;
      taskCreatorRun({ ...values, projectId: queryParams.projectId }).then(
        () => {
          queryParams.projectId &&
            taskFindByProjectRun({ projectId: queryParams.projectId });
        }
      );
      clearValues();
    },
  });

  useEffect(() => {
    if (!isParsing && queryParams.projectId) {
      taskFindByProjectRun({ projectId: queryParams.projectId });
    }
  }, [isParsing, queryParams.projectId, taskFindByProjectRun]);

  return (
    <div>
      <h1>TasksScreen</h1>
      <pre>{JSON.stringify(queryParams, null, 2)}</pre>
      Pomodoro
      <form role="form" name="taskFormCreate" onSubmit={handleSubmit}>
        <input
          id="title"
          name="title"
          onChange={handleChange}
          type="text"
          value={values.title}
          placeholder="Add a new task"
        />

        <button type="submit">Add task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link
              href={{
                pathname: PomodoroRoutes.Pomodoro,
                query: { taskId: task.id },
              }}
            >
              <a>{task.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
