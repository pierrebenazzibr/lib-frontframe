export class UnidadeMedidaUtil {

  converterMetrosParaKilometros(metros: number) {
    if (!metros) {
      return 0;
    }
    const km = metros / 1000;
    return km.toFixed(1);
  }
}
