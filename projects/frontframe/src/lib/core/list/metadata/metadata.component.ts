import { SortDirection } from '../../enums/sort-direction.enum';
import { ButtonType } from './../../enums/buttontype.enum';
import { DataType } from './../../enums/datatype.enum';
import { Align } from './../../enums/align.enum';
import { Lista } from '../lista.model';
import { ListHandlerService } from '../list-handler.service';

type FnClick = (event: any, data: any, rowIndex: number, lista: Lista, listHandlerService: ListHandlerService) => any;

type FnValorCelula = (data: any) => any;

type FnExibirValorCelula = (data: any) => boolean;

export interface Metadata {
    /* mapeamento do campo ao json */
    fieldId: string;

    /* alinhamento do valor da celula */
    align: Align;

    /* nome que irá aparecer no header da coluna */
    fieldName?: string;

    /* tipo do dado do valor da celula  */
    dataType?: DataType;

    /* esconde a coluna mas a mantem no objet Lista para ser utilizada  */
    hidden?: boolean;

    /* atalho para rendereziar botoes comuns ( editar, excluir ... ) */
    buttonType?: ButtonType;

    /* title da celula */
    title?: string;

    /* icone da biblioteca font-awsome */
    fa_icon?: string;

    /* icone da biblioteca material (google) */
    mat_icon?: string;

    /* define se a celula tem o valor editavel */
    isEditable?: boolean;

    /* utilizar junto com o DataType.OBJECT, serve para mapear os objetos filhos do json */
    filhos?: Metadata[];

    /* caso este campo seja dinâmico e as vezes pode não estar contido no json, setar podeNaoExistir = TRUE.
       dessa forma, não será emitido o erro na grid
    */
    podeNaoExistir?: boolean;

    /* define se o campo deve ser ordenado quando a listagem for iniciada pela primeira vez */
    sortDirection?: SortDirection;

    /* define a sequencia de ordenacao, caso exista mais de um campo a ser ordenado */
    sortSequence?: number;

    /* se TRUE o campo será utilizado na busca rápida da listagem ( se mais de um tiver o parâmetro TRUE apenas o primeiro será utilizado ) */
    buscaRapida?: boolean;

    /* definir o nome do filtro, se nao for definido, a propriedade fieldId será utilizada */
    buscaRapidaFilterName?: string;

    /* funcao da celula */
    fnClick?: FnClick;

    /* função que gera o valor da célula dinamicamente */
    fnValorCelula?: FnValorCelula;

    /* se TRUE exibe o valor da celula se FALSE não exibe */
    fnExibirValorCelula?: FnExibirValorCelula;
}

