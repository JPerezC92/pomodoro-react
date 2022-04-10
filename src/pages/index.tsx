import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Task } from "@/tasks/domain/Task";
import { TaskCreateDto } from "@/tasks/infrastructure/dto/task-create.dto";
import { useForm } from "@/shared/infrastructure/hooks/useForm";
import { useTaskCreator } from "@/tasks/infrastructure/hooks/useTaskCreator";
import { useTaskFindAll } from "@/tasks/infrastructure/hooks/useTaskFindAll";

import styles from "styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { taskCreatorRun } = useTaskCreator();
  const { taskFindAllRun } = useTaskFindAll();

  const { values, handleChange, handleSubmit } = useForm<TaskCreateDto>({
    initialValues: {
      title: "",
    },

    onSubmit: (values, clearValues) => {
      taskCreatorRun(values).then(() =>
        taskFindAllRun().then((tasks) => setTasks(tasks))
      );
      clearValues();
    },
  });

  useEffect(() => {
    taskFindAllRun().then((tasks) => setTasks(tasks));
  }, [taskFindAllRun]);

  useEffect(() => {
    router.push("/projects");
    // router.prefetch("/tasks/[id]");
  }, [router]);
  // useEffect(() => {
  //   const first = (e: BeforeUnloadEvent) => {
  //     e.preventDefault();
  //     e.returnValue = "";
  //   };

  //   window.addEventListener("beforeunload", first);

  //   return () => {
  //     window.removeEventListener("unload", first);
  //   };
  // }, []);

  return (
    <div className={styles.container}>
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
            <Link href={`/${task.id}`}>
              <a>{task.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
