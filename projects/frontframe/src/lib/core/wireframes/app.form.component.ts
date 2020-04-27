import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

export class FormComponent {

    public pId: number;
    @ViewChild('f') public ngForm: NgForm;

    inserir() {}

    atualizar() {}

    excluir() {}

    apenasNumeros(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode >= 48 && charCode <= 57) {
            return true;
        }
        return false;
    }
}
