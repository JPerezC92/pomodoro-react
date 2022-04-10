export class Project {
  public id: string;
  public name: string;

  constructor({ id, name }: { id: string; name: string }) {
    this.id = id;
    this.name = name;
  }
}
