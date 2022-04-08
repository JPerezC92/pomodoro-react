import { useState } from "react";
import type { NextPage } from "next";

import { Task } from "@/tasks/domain/Task";
import { TaskCreateDto } from "@/tasks/infrastructure/dto/task-create.dto";
import { useForm } from "@/shared/hooks/useForm";
import { useTaskCreator } from "@/tasks/infrastructure/hooks/useTaskCreator";
import styles from "styles/Home.module.css";

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { taskCreatorRun } = useTaskCreator();

  const { values, handleChange, handleSubmit } = useForm<TaskCreateDto>({
    initialValues: {
      title: "",
    },
    onSubmit: (values, clearValues) => {
      const task = taskCreatorRun(values);
      setTasks((s) => [...s, task]);
      clearValues();
    },
  });

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
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
