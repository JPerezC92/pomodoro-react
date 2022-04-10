interface TaskProps {
  id: string;
  title: string;
  projectId: string;
}

export class Task {
  public id: string;
  public title: string;
  public projectId: string;

  constructor({ id, title, projectId }: TaskProps) {
    this.id = id;
    this.title = title;
    this.projectId = projectId;
  }
}
