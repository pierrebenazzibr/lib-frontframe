import { Component, ViewChild, Input } from '@angular/core';

import * as $ from 'jquery';
import { OverlayPanel, Dropdown } from 'primeng/primeng';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'lib-app-popover-dropdownlist',
  templateUrl: './popover-dropdownlist.component.html'
})
export class PopoverDropdownlistComponent {

  @ViewChild('op') public op: OverlayPanel;
  @ViewChild('campo') public domCampo: Dropdown;

  @Input() carregarDropdown: Function;
  // @Input() options: () => [any];

  options: any[];
  optionLabel: string;
  selectedOption: any;
  event: any;
  idCelula: string;
  valorCelula: string | number;
  subject: Subject<string>;
  placeholder: string;

  constructor() { }

  show(event: any
      , options: any[]
      , optionsLabel: string
      , idCelula?: string
      , valorCelula?: string | number
      , placeholder?: string): Observable<any> {

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
      this.options = options;
      this.optionLabel = optionsLabel;
      return this.subject = new Subject();
  }

  onBeforeShow() {
      this.selectedOption = null;
  }

  onAfterShow() {
      setTimeout(() => {
          if (this.valorCelula) {
              this.selectedOption = this.valorCelula;
          }
          document.getElementById('domCampo').focus();
          $(document.querySelector('#' + this.idCelula)).addClass('em_edicao');
          $(document.querySelector('#icon_edit' + this.idCelula)).addClass('em_edicao');

          // this.options = this.carregarDropdown(this.service);
          // this.service.subscribe({
          //     next(value) {
          //         console.log('value: ' + value);
          //         this.options = value;
          //     },
          //     complete() {
          //         console.log('completed');
          //     }
          // });
      }, 250);
  }

  onBeforeHide() {
      $(document.querySelector('#' + this.idCelula)).removeClass('em_edicao');
      $(document.querySelector('#icon_edit' + this.idCelula)).removeClass('em_edicao');
      this.selectedOption = null;
      this.event = null;
      this.idCelula = null;
      this.valorCelula = null;
      this.options = null;
      this.optionLabel = null;
  }

  onAfterHide() {
      this.subject.complete();
  }

  onChangeCampo(event: any) {
      /*
      $(document.querySelector('#' + this.idCelula))
                .find('span')
                .html(event.value[this.optionLabel]);
      */
      this.subject.next(event);
      this.op.hide();
  }

  // onEnter(event: any) {
  //     this.subject.next(this.campo);
  //     this.op.hide();
  // }

  onEsc(event: any) {
      this.op.hide();
  }
}
