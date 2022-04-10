interface TaskProps {
  id: string;
  title: string;
  projectId: string;
}

interface TaskConfiguration {
  timeBreakLength: number;
  // workTimeLength: Minutes;
}

setTimeout(() => {}, 1000);

class Minutes {
  private oneSecond: number = 60;
  private oneMilisecond: number = this.oneSecond * 1000;

  private seconds: number;
  private minutes: number;
  private milisecond: number;

  constructor(minutes: number) {
    this.minutes = minutes;
    this.seconds = minutes * this.oneSecond;
    this.milisecond = minutes * this.oneMilisecond;
  }

  toString() {
    return `${this.minutes} minutes`;
  }
}

class TaskConfiguration {
  workTimeLength: number;

  constructor(p: { minutes: number }) {
    this.workTimeLength = p.minutes;
  }
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
