import { ToastyService, ToastData } from 'ng2-toasty';
import { Injectable } from '@angular/core';

export enum Duracao {
   CURTO = 5000
   , MEDIO = 10000
   , DEMORADO = 15000
   , FIXO = 0
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

    constructor(
        private toastyService: ToastyService
    ) {}

    private toasterWaitId = 0;


    error(titulo?: string, msg?: string, timeout?: Duracao) {
        if (!titulo) {
          titulo = 'Ocorreu um erro na operação!';
        }
        this.toastyService.error(this.montaToast(titulo, msg, timeout));
    }

    success(titulo?: string, msg?: string, timeout?: Duracao) {
        if (!titulo) {
          titulo = 'Operação realizada com sucesso!';
        }
        this.toastyService.success(this.montaToast(titulo, msg, timeout));
    }

    info(titulo: string, msg?: string, timeout?: Duracao) {
        this.toastyService.info(this.montaToast(titulo, msg, timeout));
    }

    warning(titulo: string, msg?: string, timeout?: Duracao) {
        this.toastyService.warning(this.montaToast(titulo, msg, timeout));
    }

    loading() {
      this.wait();
    }

    wait(titulo?: string, toasterWaitId?: number) {
      this.toastyService.wait({
        timeout: 0
        , title: (titulo ? titulo : 'Carregando...')
        , onAdd: (toast: ToastData) => {
          if (toasterWaitId) {
            toast.id = toasterWaitId;
          }
          else {
            this.toasterWaitId = toast.id;
          }
        }
      });
    }

    montaToast(titulo: string, msg?: string, timeout?: Duracao) {
      const toast: any = {
        title: titulo
        , msg: msg
      };
      if (timeout >= 0) {
        toast.timeout = timeout;
      }
      return toast;
    }

    clearWait(toasterWaitId?: number) {
      if (toasterWaitId) {
        this.toastyService.clear(toasterWaitId);
      }
      else if (this.toasterWaitId) {
        this.toastyService.clear(this.toasterWaitId);
        this.toasterWaitId = null;
      }
    }
}
