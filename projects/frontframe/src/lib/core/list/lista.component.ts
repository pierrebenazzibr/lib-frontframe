import { DefaultFilter } from './../framework/default-service.interface';
import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, Observable, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/primeng';

import { ILista } from './lista.interface';
import { DefaultService } from './../framework/default-service';
import { ListHandlerService } from './list-handler.service';
import { Lista } from './lista.model';
import { ToasterService } from '../framework/toaster/toaster.service';
import { PopoverInputComponent } from '../framework/popover-input/popover-input.component';
import { ListaUtil } from './lista-util';
import { ListaResultset } from './lista-resultset.interface';
import { Metadata } from './metadata/metadata.component';
import { Constantes } from '../framework/constantes';


@Component({
  selector: 'lib-app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('poi') public poi: PopoverInputComponent;

  // Se esta variável for FALSE, significa que este componente nao deve alterar o menu/breadcrumb
  @Input() pHasCaption = true;
  // @Input() pConfigurarMenuConfig = false;
  @Input() tipoLista: string;
  @Input() controller: ILista;
  @Input() pAoSelecionarLinha: Function;
  @Input() pCarregarListagem: Function;

  refreshHackFix = true;

  subscriptionListRefresh: Subscription;
  subscriptionParam: Subscription;

  private context: ListaComponent = this;
  private listaUtil: ListaUtil = null;

  lista: Lista;
  totalRegistros = 0;
  size = 0;
  loading: boolean;
  filter: DefaultFilter;
  hasError = false;
  // Parâmetro tipo JSON recebido via QueryParam ( encodificado base64 )
  param: any;

  @ViewChild('inputBuscaRapida') inputBuscaRapida: ElementRef;
  metadataBuscaRapida: Metadata = null;
  buscaRapidaNomePlaceholder = '';
  private subscriptionBuscaRapida: Subscription;

  constructor(
      private route: ActivatedRoute
      , private router: Router
      , public toasterService: ToasterService
      , public listHandlerService: ListHandlerService
  ) {
      this.lista = {
          idLista: this.tipoLista
          , resultset: null
          , cols: []
      };

      this.listaUtil = new ListaUtil();
      this.filter = this.listaUtil.criaDefaultFilter();

      this.subscriptionListRefresh = this.listHandlerService.listRefresh$.subscribe(listHandlerParam => {

          if (listHandlerParam && listHandlerParam.lista) {

                  this.lista = listHandlerParam.lista;
                  // hack para forçar o refresh da PrimeNg TurboTable ( aparentemente um bug no componente )
                  this.recarregarListagemHack();
                  setTimeout(() => {
                    this.loading = false;
                  }, 0);
                  // caso tenha sido passado os dados da lista, nada mais deve ser executado
          }
          else if (listHandlerParam && listHandlerParam.tipo && (listHandlerParam.tipo === 'EXIBIR_CARREGANDO'   ||
                                                                 listHandlerParam.tipo === 'ESCONDER_CARREGANDO' ||
                                                                 listHandlerParam.tipo === 'ERRO' )) {
            if (listHandlerParam.tipo === 'ERRO') {
              setTimeout(() => {
                this.loading = false;
                this.hasError = true;
              }, 0);
            }
            else if (listHandlerParam.tipo === 'EXIBIR_CARREGANDO') {
              setTimeout(() => {
                this.loading = true;
              }, 0);
            }
            else {
              setTimeout(() => {
                this.loading = false;
              }, 0);
            }
          }
          else {
              this.loading = false;

              if (listHandlerParam) {
                  if (listHandlerParam.filtro) {
                      this.filter = listHandlerParam.filtro;
                  }
                  if (listHandlerParam.tipo) {
                      this.tipoLista = listHandlerParam.tipo;
                  }
              }
              if (this.pCarregarListagem) {
                  this.pCarregarListagem();
              }
              else {
                  this.carregarListagem('subscriptionListRefresh');
              }
          }

      });

      this.subscriptionParam = this.route.params.subscribe(params => {
          // console.log('list: this.route.params.subscribe: params: ' + JSON.stringify(params));
          // objeto genérico que pode ser passado p/ a lista.
          if (params['param']) {
              this.param = JSON.parse(atob(params['param']));
          }
      });
  }


  aoMudarPagina(event: LazyLoadEvent) {
    if (!this.controller) {
      this.toasterService.warning('Controller não encontrado.');
      return;
    }
    else {
      if (this.controller.aoMudarPagina) {
        // TODO: necessario setar this.size, this.totalRegistros aqui para paginacao de listas fora do Default
        // this.controller.aoMudarPagina(event)
        //                .subscribe(listaPaginacao => {
        //                  if (listaPaginacao) {
        //                    this.size = listaPaginacao.tamanhoPagina;
        //                    this.totalRegistros = listaPaginacao.totalRegistros;
        //                  }
        //                });
        return;
      }
    }

    if (!this.controller.getService && !this.controller.getListaObservable) {
      this.toasterService.warning('Service e Observable não encontrados.');
      return;
    }

    const pagina = this.listaUtil.calculaPagina(event);

    this.filter.page = pagina;

    this.filter = this.listaUtil.defineOrdenacao(event, this.filter);

    // se nao existir ordenacao é um sinal que pode se tratar da primeira requisição. deve-se verificar se existe ordenação no metadata.
    if ( !this.filter.sort ) {
      this.filter = this.listaUtil.defineOrdenacaoPeloMetadata(this.lista.cols, this.filter);
    }

    let observable: Observable<ListaResultset<any>>;

    if (this.controller.getListaObservable) {
      observable = this.controller.getListaObservable(this.filter);
    }
    else {
      observable = (this.controller.getService() as DefaultService<any>)
                                   .listar(this.filter);
    }
    observable .pipe (
                  map (response => {
                    this.size = response['size'];
                    this.totalRegistros = response['totalElements'];
                    this.lista.resultset = response;
                    this.loading = false;
                  })
                )
                .subscribe();
  }

  ngOnInit() {
      this.loading = true;

      if (this.controller && this.controller.getMetadata) {
        this.lista.cols = this.controller.getMetadata();
        this.metadataOnChange();
      }
      else {
        this.carregarListagem('ngOnInit');
      }
  }

  ngAfterViewInit() {
    this.criaSubscriptionInputBuscaRapida();
  }

  criaSubscriptionInputBuscaRapida() {
    if ( !this.inputBuscaRapida ) {
      return;
    }
    setTimeout(() => {
      this.inputBuscaRapida.nativeElement.focus();
    }, 950);

    const palavra$ = fromEvent<any>(this.inputBuscaRapida.nativeElement, 'keyup')
                    .pipe(
                      map(event => event.target.value),
                        // startWith(''),
                        debounceTime(Constantes.default_debounce_time),
                        distinctUntilChanged()
                    );
    this.subscriptionBuscaRapida = palavra$.subscribe(
        _palavra => {
          if ( this.metadataBuscaRapida ) {
            this.filter[this.metadataBuscaRapida.buscaRapidaFilterName ? this.metadataBuscaRapida.buscaRapidaFilterName
                                                                          : this.metadataBuscaRapida.fieldId]
                                                                          = _palavra;
            this.loading = true;

            if (this.pCarregarListagem) {
              this.pCarregarListagem();
            }
            else {
                this.carregarListagem('subscriptionListRefresh');
            }
          }
        }
      );
  }


  aoSelecionarLinha(e: any, dataKey: any) {
      if (this.controller && this.controller.aoSelecionarLinha) {
        this.controller.aoSelecionarLinha(e, dataKey);
      }
  }

  carregarListagem(origem?: string) {
    let observable: Observable<ListaResultset<any>>;

    if (this.controller.getService && this.controller.getService()) {
      observable = (this.controller.getService() as DefaultService<any>)
                  .listar(this.filter);
    }
    else if (this.controller.getListaObservable) {
      observable = this.controller.getListaObservable(this.filter);
    }
    else {
      return this.recarregarListagemHack();
    }

    observable .pipe (
                  map (response => {
                    if (response && response.content) {
                      this.size = response['size'];
                      this.totalRegistros = response['totalElements'];
                      this.lista.resultset = response;
                      this.loading = false;
                    }
                  })
                )
                .subscribe();
    // if (this.controller.getService && this.controller.getService()) {
    //   (this.controller.getService() as DefaultService<any>)
    //   .listar(this.filter)
    //   .pipe (
    //     map (response => {
    //       if (response && response.content) {
    //         this.size = response['size'];
    //         this.totalRegistros = response['totalElements'];
    //         this.lista.resultset = response;
    //         this.loading = false;
    //       }
    //     })
    //   )
    //   .subscribe();
    // }
    // else {
    //   this.recarregarListagemHack();
    // }
  }

  // hack para forçar o refresh da PrimeNg TurboTable ( aparentemente um bug no componente )
  public recarregarListagemHack() {
    this.refreshHackFix = false;
    setTimeout(() => {
          if ( this.controller.getMetadata() ) {
            this.lista.cols = this.controller.getMetadata();
          }
          this.refreshHackFix = true;
          this.metadataOnChange();
      }, 0);
  }

  metadataOnChange() {
    this.metadataBuscaRapida = this.listaUtil.getCampoComBuscaDoMetadata(this.lista.cols);
    if ( this.metadataBuscaRapida ) {
      this.buscaRapidaNomePlaceholder = `Buscar por ${this.metadataBuscaRapida.fieldName.toLowerCase()}`;
      this.criaSubscriptionInputBuscaRapida();
    }
  }

  ngOnDestroy() {
      if (this.subscriptionListRefresh) {
          this.subscriptionListRefresh.unsubscribe();
      }
      if (this.subscriptionParam) {
          this.subscriptionParam.unsubscribe();
      }
      if (this.subscriptionBuscaRapida) {
        this.subscriptionBuscaRapida.unsubscribe();
      }
  }
}

