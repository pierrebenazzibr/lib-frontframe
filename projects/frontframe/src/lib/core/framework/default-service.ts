import { ListaResultset } from './../list/lista-resultset.interface';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { ListaComponent } from '../list/lista.component';


export interface IPageableParams {
    size?: number;
}

export interface DefaultFilter extends IPageableParams {
    status?: string;
}

export class DefaultService<T> {

  constructor(
    public httpClient: HttpClient
    , public errorHandlerService: ErrorHandlerService
    , private url: string
  ) { }

  public httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
      })
  };

  public static converterFiltroParaHttpParam(filter: any, params?: HttpParams): HttpParams {
      if (!params) {
          params = new HttpParams();
      }
      if (filter) {
          Object.keys(filter).forEach(key => {
              params = params.append(key, filter[key]);
          });
      }
      return params;
  }


  fetch(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${id}`)
                          .pipe(
                            catchError( err => throwError(this.errorHandlerService.handle(err)) )
                          );
  }

  listar(filter: any, listComponent?: ListaComponent): Observable<ListaResultset<T>> {
    const params = DefaultService.converterFiltroParaHttpParam(filter);

    return this.httpClient.get<ListaResultset<T>>(this.url, {params})
               .pipe (
                 catchError (err => {
                    if (listComponent) {
                        listComponent.loading = false;
                        listComponent.hasError = true;
                    }
                    return throwError(this.errorHandlerService.handle(err));
                })
               );
  }

  atualizar(id: number, item: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${id}`, item, this.httpOptions)
                          .pipe(
                            catchError( err => throwError(this.errorHandlerService.handle(err)) )
                          );
  }

  inserir(item: T): Observable<T> {
      return this.httpClient.post<T>(this.url, item, this.httpOptions)
                            .pipe(
                              catchError( err => throwError(this.errorHandlerService.handle(err)) )
                            );
  }

  excluir(id: number): Observable<void> {
      return this.httpClient.delete<void>(`${this.url}/${id}`)
                            .pipe(
                              catchError( err => throwError(this.errorHandlerService.handle(err)) )
                            );
  }
}
