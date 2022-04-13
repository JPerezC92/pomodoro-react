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

  useEffect(() => {
    router.push("/projects");
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

  return <div className={styles.container}>Pomodoro</div>;
};

export default Home;
