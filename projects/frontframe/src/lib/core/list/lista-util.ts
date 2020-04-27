import { Metadata } from './metadata/metadata.component';

import { LazyLoadEvent } from 'primeng/primeng';

import { DefaultFilter } from './../framework/default-service.interface';

export class ListaUtil {

  defineOrdenacao(event: LazyLoadEvent, _filter: DefaultFilter): DefaultFilter {
    let _order = null;
    if (event && event.sortField && event.sortOrder) {
      _order = event.sortField + ',' + (event.sortOrder === 1 ? 'asc' : 'desc');
    }
    if (_order) {
      _filter.sort = _order;
    }
    return _filter;
  }

  defineOrdenacaoPeloMetadata(metadatas: Metadata[], filter: DefaultFilter): any {
    if ( metadatas ) {
      for (const metadata of metadatas) {
        if ( metadata.sortDirection ) {
          filter.sort = `${metadata.fieldId},${metadata.sortDirection}`;
          return filter;
        }
      }
    }
    return filter;
  }

  calculaPagina(event: LazyLoadEvent): number {
    if ( !event || event.rows === 0 ) {
      return 0;
    }
    else {
      return event.first / event.rows;
    }
  }

  criaDefaultFilter(pagina?: number): DefaultFilter {
    if ( !pagina ) {
      pagina = 0;
    }
    const filter: DefaultFilter = {
      status: 'A',
      page: pagina
    };
    return filter;
  }

  getCampoComBuscaDoMetadata(metadatas: Metadata[]): Metadata {
    if ( metadatas ) {
      for (const metadata of metadatas) {
        if ( metadata.buscaRapida ) {
          return metadata;
        }
      }
    }
    return null;
  }
}
