import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Lista } from './lista.model';

export class ListHandlerParam {
    filtro: any;
    tipo?: string;
    lista?: Lista;
}

@Injectable()
export class ListHandlerService {

    private listRefreshSource = new Subject<ListHandlerParam>();
    listRefresh$ = this.listRefreshSource.asObservable();

    refreshList(listHandlerParam?: ListHandlerParam) {
        this.listRefreshSource.next(listHandlerParam);
    }

    exibirCarregando() {
      const listHandlerParam = new ListHandlerParam();
      listHandlerParam.tipo = 'EXIBIR_CARREGANDO';
      this.listRefreshSource.next(listHandlerParam);
    }

    esconderCarregando() {
      const listHandlerParam = new ListHandlerParam();
      listHandlerParam.tipo = 'ESCONDER_CARREGANDO';
      this.listRefreshSource.next(listHandlerParam);
    }

    exibirErro() {
      const listHandlerParam = new ListHandlerParam();
      listHandlerParam.tipo = 'ERRO';
      this.listRefreshSource.next(listHandlerParam);
    }
}
