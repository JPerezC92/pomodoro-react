import { ProjectId } from "./ProjectId";
import { ProjectName } from "./ProjectName";

export class Project {
  public id: ProjectId;
  public name: ProjectName;

  constructor({ id, name }: { id: ProjectId; name: ProjectName }) {
    this.id = id;
    this.name = name;
  }
}
