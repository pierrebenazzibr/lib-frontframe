import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'lib-app-confirmacao.component',
  templateUrl: './confirmacao.component.html'
})
export class ConfirmacaoComponent {

    constructor(
        private confirmationService: ConfirmationService
    ) {}

    public confirmarExclusao(fnAccept: any, fnReject?: any) {
        this.confirmar('Confirmação de exclusão',
        'Tem certeza que deseja excluir?',
        'fa fa-trash',
        fnAccept,
        fnReject
       );
    }

    public confirmarAtualizacao(fnAccept: any, fnReject?: any) {
        this.confirmar('Confirmação de atualização',
                       'Tem certeza que deseja salvar?',
                       'fa fa-save',
                       fnAccept,
                       fnReject
                      );
    }

    public confirmar(titulo: string, mensagem: string, fa_icon: string, fnAccept: any, fnReject?: any) {
      this.confirmationService.confirm({
          header: ( titulo ? titulo : 'Confirmação de operação' )
          , message: ( mensagem ? mensagem : 'Tem certeza que deseja realizar esta operação?' )
          , icon: fa_icon
          , accept: () => {
              if (fnAccept) { fnAccept(); }
          }
          , reject: () => {
              if (fnReject) { fnReject(); }
          }
      });
  }

  public confirmarSimples(fnAccept: any, fnReject?: any) {
    return this.confirmar(null, null, null, fnAccept, fnReject);
  }

}
