import { DefaultFilter } from './../framework/default-service';
import { LazyLoadEvent } from 'primeng/primeng';

import { ListaPaginacao } from './lista-paginacao.interface';
import { Metadata } from './metadata/metadata.component';
import { DefaultService } from '../framework/default-service';
import { Observable } from 'rxjs';
import { ListaResultset } from './lista-resultset.interface';

export interface ILista {

  aoMudarPagina?(event: LazyLoadEvent): Observable<ListaPaginacao>;

  getListaObservable?(filter: DefaultFilter): Observable<ListaResultset<any>>;

  aoSelecionarLinha(e: any, dataKey: any): void;

  getService(): DefaultService<any>;

  getMetadata(): Metadata[];

}
