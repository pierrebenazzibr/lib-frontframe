import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { InterceptorSkipHeader } from './http-interceptor-skipheader.model';
// import { AutenticacaoService } from 'src/app/seguranca/autenticacao.service';
import { AmbienteService } from '../multi-tenancy/ambiente.service';
import { Ambiente } from '../multi-tenancy/ambiente.model';
import { ToasterService } from './toaster/toaster.service';
import { Constantes } from './constantes';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private ambiente: Ambiente = null;

  constructor(
      // private autenticacaoService: AutenticacaoService,
      private ambienteService: AmbienteService
      , private toasterService: ToasterService
  ) {
    this.ambiente = this.ambienteService.getAmbiente();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (req.headers.has(InterceptorSkipHeader)) {
          const headers = req.headers.delete(InterceptorSkipHeader);
          return next.handle(req.clone({ headers }));
      }

      if (req.url.indexOf(Constantes.url_configuracao) >= 0) {
        const apiRequest = req.clone({url: `${Constantes.url_healthlog_api}${req.url}`})
                              .clone({setHeaders: {'KeyDS': this.ambiente.keyDS}});
        return next.handle(apiRequest);
      }
      else {
        return this.fazerRequisicao(req, next);
      }
    }

    fazerRequisicao(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // const authToken = this.autenticacaoService.getTokenDeAcessoValido();
      const authToken = '';
      if ( authToken ) {
        const apiRequest = req.clone({url: `${Constantes.url_healthlog_api}${req.url}`})
                              .clone({setHeaders: { Authorization: 'Bearer ' + authToken, 'KeyDS': this.ambiente.keyDS}
                            });
        return next.handle(apiRequest);
      }
      // else {
      //   return this.autenticacaoService
      //       .getTokenDeAcessoPeloRefreshToken()
      //       .pipe (
      //         switchMap (accessTokenNovo => {
      //           if (accessTokenNovo) {
      //             const apiRequest = req.clone({url: `${environment.url_healthlog_api}${req.url}`})
      //                                   .clone({setHeaders: { Authorization: 'Bearer ' + accessTokenNovo, 'KeyDS': this.ambiente.keyDS}
      //                                 });
      //             return next.handle(apiRequest);
      //           }
      //           else {
      //             this.toasterService.warning('Sua sessão expirou. Favor refazer o login!');
      //           }
      //         })
      //         , catchError ( (error: any) => {
      //             console.error(error);
      //             this.toasterService.error('Ocorreu um erro ao recuperar sua chave de acesso', JSON.stringify(error));
      //             return empty();
      //         })
      //       );
      // }
    }
  }
