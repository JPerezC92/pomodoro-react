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
import { Redirect } from "@/shared/infrastructure/components/Redirect";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";

const Home: NextPage = () => {
  return <Redirect pathname={TaskRoutes.tasks} />;
};

export default Home;
