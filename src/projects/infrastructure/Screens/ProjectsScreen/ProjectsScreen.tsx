import { FC, useEffect } from "react";

import { useForm } from "@/shared/infrastructure/hooks/useForm";
import { useProjectCreator } from "../../hooks/useProjectCreator";
import { useProjectLocalStore } from "../../hooks/useProjectLocalStore";
import { useProjectsFindAll } from "../../hooks/useProjectsFindAll";
import Link from "next/link";
import { ProjectRoutes } from "../../project.routes";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";

type ProjectsScreenProps = {};

export const ProjectsScreen: FC<ProjectsScreenProps> = (props) => {
  const { projects, projectStore } = useProjectLocalStore();

  const { projectsFindAllRun } = useProjectsFindAll(projectStore);
  const { projectCreatorRun } = useProjectCreator();

  const { values, handleChange, handleSubmit } = useForm({
    initialValues: { name: "" },
    onSubmit: (values) => projectCreatorRun(values).then(projectsFindAllRun),
  });

  useEffect(() => {
    projectsFindAllRun();
  }, [projectsFindAllRun]);

  return (
    <div>
      <h1>Projects</h1>
      <form role="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={values.name}
          name="name"
          id="name"
          onChange={handleChange}
        />
        <button type="submit">Add Project</button>
      </form>

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              href={{
                pathname: TaskRoutes.tasks,
                query: { projectId: project.id },
              }}
            >
              <a>{project.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
