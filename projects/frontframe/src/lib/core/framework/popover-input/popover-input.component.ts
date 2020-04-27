import { Component, ViewChild } from '@angular/core';

import { OverlayPanel, Dropdown } from 'primeng/primeng';
import { Subject, Observable } from 'rxjs';

import * as $ from 'jquery';

@Component({
  selector: 'lib-app-popover-input',
  templateUrl: './popover-input.component.html'
})
export class PopoverInputComponent {

  @ViewChild('op') public op: OverlayPanel;
  @ViewChild('campo') public domCampo: Dropdown;

  campo: string;
  event: any;
  idCelula: string;
  valorCelula: string | number;
  subject: Subject<string>;
  placeholder: string;

  constructor() {
  }

  show(event: any, idCelula?: string, valorCelula?: string | number, placeholder?: string): Observable<string> {
      // limpar celula antiga, caso exista ( caso o popover nao saia da tela, o metodo onBeforeHide nao chega a ser chamado )
      if (this.idCelula) {
          $(document.querySelector('#' + this.idCelula)).removeClass('em_edicao');
          $(document.querySelector('#icon_edit' + this.idCelula)).removeClass('em_edicao');
      }
      this.event = event;
      this.idCelula = idCelula;
      this.valorCelula = valorCelula;
      this.op.show(event);
      this.placeholder = placeholder;
      return this.subject = new Subject();
  }

  onBeforeShow() {
      this.campo = null;
  }

  onAfterShow() {
      setTimeout(() => {
          if (this.valorCelula) {
              this.campo = this.valorCelula + '';
          }
          document.getElementById('domCampo').focus();
          $(document.querySelector('#' + this.idCelula)).addClass('em_edicao');
          $(document.querySelector('#icon_edit' + this.idCelula)).addClass('em_edicao');
      }, 250);
  }

  onBeforeHide() {
      $(document.querySelector('#' + this.idCelula)).removeClass('em_edicao');
      $(document.querySelector('#icon_edit' + this.idCelula)).removeClass('em_edicao');
      this.campo = null;
      this.event = null;
      this.idCelula = null;
      this.valorCelula = null;
  }

  onAfterHide() {
      this.subject.complete();
  }


  onEnter(event: any) {
      this.subject.next(this.campo);
      this.op.hide();
  }

  onEsc(event: any) {
      this.op.hide();
  }
}
