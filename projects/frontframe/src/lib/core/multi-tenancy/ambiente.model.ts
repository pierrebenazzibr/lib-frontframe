export class Ambiente {

  keyDS: string;
  nome: string;
  urlHealthlog: string;
  urlHealthmap: string;
  isAmbientePronto?: boolean;
  versaoAPI?: string;

  public toString?(): void {
    console.log('keyDS: ' + this.keyDS);
    console.log('nome: ' + this.nome);
    console.log('urlHealthlog: ' + this.urlHealthlog);
    console.log('urlHealthmap: ' + this.urlHealthmap);
    console.log('versaoAPI: ' + this.versaoAPI);
  }

  constructor() {
    this.keyDS = null;
    this.nome = null;
    this.urlHealthlog = null;
    this.urlHealthmap = null;
    this.isAmbientePronto = false;
    this.versaoAPI = null;
  }

  setKeyDS(value: string): Ambiente {
    this.keyDS = value;
    return this;
  }

  setNome(value: string): Ambiente {
    this.nome = value;
    return this;
  }

  setUrlHealthlog(value: string): Ambiente {
    this.urlHealthlog = value;
    return this;
  }

  setUrlHealthmap(value: string): Ambiente {
    this.urlHealthmap = value;
    return this;
  }

  setVersaoAPI(value: string): Ambiente {
    this.versaoAPI = value;
    return this;
  }

}
