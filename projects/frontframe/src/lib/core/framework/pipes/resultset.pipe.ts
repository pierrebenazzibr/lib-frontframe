import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { ButtonType } from './../../enums/buttontype.enum';
import { Align } from './../../enums/align.enum';
import { DataType } from './../../enums/datatype.enum';
import { Metadata } from './../../list/metadata/metadata.component';

@Pipe({
  name: 'resultsetPipe'
})
export class ResultsetPipe implements PipeTransform {

    constructor(
        private datePipe: DatePipe
        , private domSanitizer: DomSanitizer
    ) {}

    transform(valorCelulas: any
              , metadata: Metadata
              , rowIndex: number
              , retornarApenasValor?: boolean): any {

        let valorRetorno: any = null;
        try {
            // se existir a funcao e a mesma retornar FALSE a intencao do desenvolvedor eh esconder a celula.
            if (metadata.fnExibirValorCelula) {
              if (!metadata.fnExibirValorCelula(valorCelulas)) {
                return '';
              }
            }

            if (!metadata.dataType) {
                metadata.dataType = DataType.TEXT;
            }
            if (!metadata.align) {
                metadata.align = Align.LEFT;
            }

            valorRetorno = this.procurarValorDoAtributo(metadata.fieldId, valorCelulas);

            // tratar valor nao encontrado (null no JSON) ou fieldId nao encontrado
            if (valorRetorno === null) {
                valorRetorno = '';
            }
            else if (valorRetorno === undefined) {
                if (!metadata.podeNaoExistir) {
                    console.error(JSON.stringify(valorCelulas));
                    throw new ReferenceError('verifique o atributo: ' + metadata.fieldId);
                }
            }

            if (metadata.fnValorCelula) {
              valorRetorno = metadata.fnValorCelula(valorCelulas);
            }

            // TRATAR DADO DE ACORDO COM O TIPO DE DATA
            valorRetorno = this.tratarDadoPeloDataType(metadata, valorRetorno);

            if (retornarApenasValor) {
                return this.domSanitizer.bypassSecurityTrustHtml(valorRetorno);
            }
            else if (metadata.isEditable) {
                valorRetorno = `<i  id='icon_edit__` + metadata.fieldId + `_` + rowIndex + `'
                                        class='material-icons editable-icon' style='margin-right:4px;'>edit</i>
                                        <span style='pointer-events: none;' onclick='return false;'>` + valorRetorno + '</span>';
                valorRetorno = this.domSanitizer.bypassSecurityTrustHtml(valorRetorno);
            }
        } catch (e) {
            console.error(e);
            return  '<font color=red>' + e.message + '</font>';
        }

        return valorRetorno;
    }



    tratarDadoPeloDataType(metadata: Metadata, valorRetorno: any): any {
        switch (metadata.dataType) {
            case DataType.TEXT:
            case DataType.NUMBER:
                 break;

            case DataType.DATE:
                valorRetorno = this.datePipe.transform(valorRetorno, 'dd/MM/yyyy');
                break;

            case DataType.BUTTON:
                valorRetorno = this.construirBotao(metadata);
                valorRetorno = this.domSanitizer.bypassSecurityTrustHtml(valorRetorno);
                break;

            case DataType.OBJECT:
                valorRetorno = this.procurarValorDoAtributoComFilhos(metadata.filhos, valorRetorno);
                break;

            default:
                break;
        }
        return valorRetorno;
    }

    construirBotao(metadata: Metadata): any {
        let valorRetorno: any;
        if (metadata.buttonType !== null) {
          switch (metadata.buttonType) {
            case ButtonType.EXCLUIR:
              metadata.mat_icon = 'delete';
              break;

            case ButtonType.EDITAR:
              metadata.mat_icon = 'edit';
              break;

            case ButtonType.DOWNLOAD:
              metadata.mat_icon = 'get_app';
              break;

              case ButtonType.LIST:
                metadata.mat_icon = 'list';
                break;

            default:
                break;
          }
        }

        if (metadata.fa_icon) {
            valorRetorno = '<i pButton class="' + metadata.fa_icon + '"></i>';
        }
        if (metadata.mat_icon) {
            valorRetorno = '<i pButton class="material-icons">' + metadata.mat_icon + '</i>';
        }
        return valorRetorno;
    }


    procurarValorDoAtributoComFilhos(filhos: Metadata[], valorCelula: string): string {
        if (filhos && valorCelula) {
            let valorRetorno = '';
            let i = 0;
            for (i = 0; i < filhos.length; i++) {
                let _valorFilho = this.procurarValorDoAtributo(filhos[i].fieldId, valorCelula);

                // tratar valor nao encontrado (null no JSON) ou fieldId nao encontrado
                if (_valorFilho === null) {
                    _valorFilho = '';
                }
                else if (_valorFilho === undefined) {
                    if (!filhos[i].podeNaoExistir) {
                        _valorFilho = '<font color=red>verifique o atributo: ' + filhos[i].fieldId + '</font>';
                    }
                }
                else {
                    _valorFilho = this.tratarDadoPeloDataType(filhos[i], _valorFilho);
                }

                if (valorRetorno) {
                    valorRetorno += '<br>';
                }
                valorRetorno += '<b>' + filhos[i].fieldName + '</b>: ' + _valorFilho;
            }
            return '<div style="display:inline-block">' + valorRetorno + '</div>';
        }
        else if (valorCelula) {
            return JSON.stringify(valorCelula);
        }
        else {
            return '';
        }
    }


    procurarValorDoAtributo(fieldId: string, valorCelula: any): string {
        if (!fieldId) {
            return null;
        }

        const percorrerPropriedades = fieldId.indexOf('.') > -1;
        if (percorrerPropriedades) {

            const atributo: string[] = fieldId.split('.');
            let valorCelulaTemp = valorCelula;

            for (let i = 0; i < atributo.length; i++) {
                if (valorCelulaTemp) {
                    valorCelulaTemp = valorCelulaTemp[atributo[i]];

                    // ultima propriedade => retornar valor
                    if (i === atributo.length - 1) {
                        return valorCelulaTemp;
                    }
                }
                else {
                    return valorCelulaTemp;
                }
            }
        }
        else {
            return valorCelula[fieldId];
        }
        return null;
    }

}
