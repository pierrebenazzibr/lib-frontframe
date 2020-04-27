import { OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { DefaultService } from '../default-service';
import { ListaResultset } from '../../list/lista-resultset.interface';
import { ErrorHandlerService } from '../error-handler.service';
import { Constantes } from '../constantes';

type FnBuscarItem = (filter: any) => Observable<ListaResultset<any>>;


export class MyAutocomplete<T> implements OnDestroy {

  resultset: T[];
  resultsetMaxSize: number;
  itemSelecionado: T;
  itemService: DefaultService<T>;
  itemSubject: Subject<T>;

  constructor(
    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private url: string,
    private fnBuscarItem?: FnBuscarItem,
    private filter?: any
  ) {
    this.itemSubject = new Subject<T>();

    if ( url ) {
      this.itemService = new DefaultService<T>(httpClient, errorHandlerService, url);
    }
    this.resultsetMaxSize = Constantes.localizador_max_size;
  }

  ngOnDestroy() {
    this.itemSubject.complete();
  }

  buscarItem(pFilter: any) {
    if ( this.fnBuscarItem ) {
      this.fnBuscarItem(pFilter)
          .subscribe( (response: ListaResultset<T>) => {
            this.resultset = response ? response.content
                                      : null;
          });
    }
    else if ( this.itemService ) {
      this.itemService
          .listar(this.filter)
          .subscribe((response: ListaResultset<T>) => {
            this.resultset = response.content;
          });
    }
  }

  onSelectItem(itemSelecionado: T) {
    this.itemSelecionado = itemSelecionado;
    this.itemSubject.next(this.itemSelecionado);
  }

  onClearItem() {
    this.itemSelecionado = null;
    this.itemSubject.next(null);
  }

}
