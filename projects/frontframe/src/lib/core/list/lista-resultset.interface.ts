export class ListaResultset<T> {
  private defaultSize = 20;

  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: any;
  numberOfElements: number;
  first: boolean;
  last: boolean;


  constructor(options: {
      content?: T[],
      totalElements?: number,
      totalPages?: number,
      size?: number,
      number?: number,
      sort?: any,
      numberOfElements?: number,
      first?: boolean,
      last?: boolean
    } = {}) {

      this.content = options.content;
      this.totalElements = options.content ? options.content.length : 0;
      this.totalPages = ( options.totalPages ? options.totalPages : Math.ceil(this.totalElements / this.defaultSize) );
      this.size = options.size ? options.size : this.defaultSize;
      this.number = options.number;
      this.sort = options.sort;
      this.numberOfElements = options.numberOfElements;
      this.first = options.first;
      this.last = options.last;

  }
}
