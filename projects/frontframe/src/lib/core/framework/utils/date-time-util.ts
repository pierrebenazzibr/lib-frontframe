export class DateTimeUtil {

    converterSegundosParaDate(seconds: number): Date {
        const d = new Date(0, 0, 0, 0, 0, 0, 0);
        d.setSeconds(seconds);
        return d;
    }

    getPrimeiroDiaDoMes(): Date {
      const date = new Date();
      const primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
      return primeiroDia;
    }

    getUltimoDiaDoMes(): Date {
      const date = new Date();
      const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return ultimoDia;
    }
}
