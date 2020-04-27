import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, from, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ChaveConfiguracao } from './chave-configuracao.enum';
import { Ambiente } from './ambiente.model';
import { AmbienteConfig } from './ambiente.config';
import { ErrorHandlerService } from '../framework/error-handler.service';
import { Configuracao } from './configuracao.model';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {

  private static ambienteEstatico: Ambiente = null;

  constructor(
    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  public getAmbiente(): Ambiente {
    if (!AmbienteService.ambienteEstatico) {
      this.inicializaAmbiente()
          .subscribe();
    }
    return AmbienteService.ambienteEstatico;
  }

  public criarInstanciaAmbiente(): Ambiente {
    AmbienteService.ambienteEstatico = new Ambiente();
    AmbienteService.ambienteEstatico.isAmbientePronto = false;
    return AmbienteService.ambienteEstatico;
  }

  fetch(chaveConfiguracao: ChaveConfiguracao): Observable<Configuracao> {

    return this.httpClient.get<Configuracao>(`/api/integracao/v1/configuracoes/${chaveConfiguracao}`)
                          .pipe(
                            catchError( err => throwError(this.errorHandlerService.handle(err)) )
                          );
  }

  buscarParametroDaConfiguracao?(configuracao: Configuracao, chaveParametro: string) {
    if (configuracao.parametros) {
      for (const parametro of configuracao.parametros) {
        if (parametro.chave === chaveParametro) {
          return parametro;
        }
      }
    }
    return {};
  }

  inicializaAmbiente(): Observable<Ambiente> {
    if (AmbienteService.ambienteEstatico && AmbienteService.ambienteEstatico.isAmbientePronto) {
      return from ([this.getAmbiente()]);
    }
    else {
      this.criarInstanciaAmbiente().keyDS = AmbienteConfig.getKeyDS(true);

      const configuracoesRequests$ = [];
      configuracoesRequests$.push(this.fetch(ChaveConfiguracao.AMBIENTE));
      configuracoesRequests$.push(this.fetch(ChaveConfiguracao.HL_HEALTHMAP));
      configuracoesRequests$.push(this.fetch(ChaveConfiguracao.NON_DATABASE_VERSAO_API));

      return forkJoin(configuracoesRequests$)
        .pipe (
          map ( (configuracoes: Configuracao[]) => {
            configuracoes.forEach(configuracao => {
              switch (configuracao.chave) {
              case ChaveConfiguracao.AMBIENTE:
                this.getAmbiente()
                    .setNome(this.buscarParametroDaConfiguracao(configuracao, 'NOME')['valor']);
              break;

              case ChaveConfiguracao.HL_HEALTHMAP:
                this.getAmbiente()
                    .setUrlHealthmap(this.buscarParametroDaConfiguracao(configuracao, 'URL_BASE')['valor']);
              break;

              case ChaveConfiguracao.NON_DATABASE_VERSAO_API:
                this.getAmbiente()
                    .setVersaoAPI(this.buscarParametroDaConfiguracao(configuracao, ChaveConfiguracao.NON_DATABASE_VERSAO_API.toString())['valor']);
              break;

              default:
              break;
              }
            });

            this.getAmbiente().isAmbientePronto = true;

            return this.getAmbiente();
          })
        );
    }
  }
}
