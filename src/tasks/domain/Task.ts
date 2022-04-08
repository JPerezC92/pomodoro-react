interface TaskProps {
  id: string;
  title: string;
}

export class Task {
  public id: string;
  public title: string;

  constructor({ id, title }: TaskProps) {
    this.id = id;
    this.title = title;
  }
}
