import { Injectable } from '@angular/core';

import { ToasterService } from './toaster/toaster.service';
import { Constantes } from './constantes';


@Injectable()
export class ErrorHandlerService {

  constructor(
      private toaster: ToasterService
  ) { }

  handle(error: any) {
    let titulo = '';
    let msg = '';
    let detail: string;
    if (typeof error === 'string') {
      msg += error;
    }
    else if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Ocorreu um erro na operação.');
      msg += 'Ocorreu um erro na operação.';
      console.error(error.error.message);
      detail = error.error.message;
    }
    else if (error.name === 'HttpErrorResponse') {

      let mensagemUsuario = '';
      switch (error.status) {
        case 502: // bad gateway
          mensagemUsuario = 'Servidor indisponível';
          break;

        case 500: // internal server error
          mensagemUsuario = 'Ocorreu um erro interno no servidor';
          break;

        case 400: // bad request
          mensagemUsuario = 'Requisição com problemas';
          break;

        case 404: // not found
          mensagemUsuario = 'Serviço/URL não encontrado';
          break;

        case 401: // not authorized
          mensagemUsuario = 'Não autorizado';
          break;

        case 503: // service unavailable
          mensagemUsuario = 'Serviço indisponível';
          break;

        case 408: // request timeout
          mensagemUsuario = 'Sua requisição expirou';
          break;

        case 403: // forbidden
          mensagemUsuario = 'Acesso não permitido';
          break;

        default:
          mensagemUsuario = 'Ocorreu um erro na operação';
          break;
      }
      titulo = mensagemUsuario;
      if ( error.status ) {
        msg += `[http error ${error.status}] - ${this.getMensagemDeErro(error)}`;
      }
      else {
        msg += `${this.getMensagemDeErro(error)}`;
      }

    }
    else {
        try {
            if (error.name) {
                titulo = error.name;
            }
            msg += this.getMensagemDeErro(error);
        }
        catch (er) {
            if (msg) { msg += '  '; }
            msg += 'Ocorreu um erro na operação.';
        }
        console.error('Ocorreu um erro na operação.', error);
    }
    if (detail) {
      if (msg) { msg += '  '; }
      msg += ' [descrição: ' + detail + ']';
    }

    this.toaster.error(titulo, msg);

    this.irParaPaginaDeLoginSeTokenExpirou(error);

    return error;
  }

  getMensagemDeErro(error: any): string {
    let msg = '';
    if (error.error && error.error.error_description) {
      if (msg) { msg += '  '; }
      msg += error.error.error_description;
    }
    else if (error.error && error.error[0] && error.error[0].mensagemUsuario) {
      if (msg) { msg += '  '; }
      msg += error.error[0].mensagemUsuario;
    }
    else if (error.error && error.error.message) {
      if (msg) { msg += '  '; }
      msg += error.error.message;
    }
    else if (error.message) {
      if (msg) { msg += '  '; }
      msg += error.message;
    }
    else {
        if (msg) { msg += '  '; }
        msg += 'Ocorreu um erro na operação.';
    }
    return msg;
  }

  irParaPaginaDeLoginSeTokenExpirou(error: any) {
    if (error.status === 401) {
      if (error.error && error.error.error && error.error.error === 'invalid_token') {
        document.location.href = document.location.origin + Constantes.caminho_pagina_login;
        // this.appComponent.verificaUsuarioLogado();
      }
    }
  }

}
