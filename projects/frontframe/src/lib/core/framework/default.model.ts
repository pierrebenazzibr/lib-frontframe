export enum Status {
  ATIVO = 'A',
  INATIVO = 'I'
}

export class DefaultModel {

  public id: number;
  public status: string;

  public getId(): number {
      return this.id;
  }

  public setId(id: number): void {
      this.id = id;
  }

  public getStatus(): string {
      return this.status;
  }

  public setStatus(status: string) {
      this.status = status;
  }
}
