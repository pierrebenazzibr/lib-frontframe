import * as $ from 'jquery';

export class GridUtil {

  static HTML_SUCESSO     = '<i pButton class="material-icons success">done</i>';
  static HTML_ERRO        = '<i pButton class="material-icons danger">priority_high</i>';
  static HTML_CARREGANDO  = '<i pButton class="fa fa-circle-o-notch fa-spin fa-lg"></i>';

  static HTML_BLOCK_ICON = `<i title='Operação não permitida...' class='material-icons'>block</i>`;


  private buscarElementoNoEvento(event: any) {
    return event.target || event.srcElement || event.currentTarget;
  }

  private buscaRecursivaPelaCelula(element: any, count: number) {
    if (!element) {
      return null;
    }
    if ($(element).attr('id') &&
        $(element).attr('id').startsWith('listaCel__')) {
      return element;
    }
    if (count < 20) {
      return this.buscaRecursivaPelaCelula(element.parent(), ++count);
    }
    else {
      return null;
    }
  }

  private buscaRecursivaPeloIdDoElemento(element: any, idProcurado: string, count: number) {
    if (!element) {
      return null;
    }
    if ($(element).attr('id') &&
        $(element).attr('id').startsWith(idProcurado)) {
      return element;
    }
    if (count < 20) {
      return this.buscaRecursivaPeloIdDoElemento(element.parent(), idProcurado, count);
    }
    else {
      return null;
    }
  }

  private buscarCelula(event: any) {
    const target = this.buscarElementoNoEvento(event);
    return this.buscaRecursivaPelaCelula($(target), 0);
  }

  public setHtmlNaCelula(event: any, html: string, celula?: any) {
    const target = celula ? celula : this.buscarCelula(event);
    if (target) {
      target.html(html);
      return target;
    }
    return null;
  }

  public celulaCarregando(event: any, celula?: any) {
    return this.setHtmlNaCelula(event, GridUtil.HTML_CARREGANDO, celula);
  }

  public celulaComErro(event: any, celula?: any) {
    return this.setHtmlNaCelula(event, GridUtil.HTML_ERRO, celula);
  }

  public celulaComSucesso(event: any, celula?: any) {
    return this.setHtmlNaCelula(event, GridUtil.HTML_SUCESSO, celula);
  }

  getLinhaElement(event: any, rowIndex: number) {
    const rowId = 'listaRow__' + rowIndex;
    const target = this.buscarElementoNoEvento(event);
    return this.buscaRecursivaPeloIdDoElemento($(target), rowId, 0);
  }
}
