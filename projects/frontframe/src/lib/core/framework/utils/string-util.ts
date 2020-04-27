export class StringUtil {

  static abreviar(texto: string, max: number): string {
    if ( texto.length > max ) {
      return texto.substr(0, max) + '...';
    }
    return texto;
  }

}
