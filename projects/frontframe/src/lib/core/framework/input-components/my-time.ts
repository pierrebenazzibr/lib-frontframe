import { Time } from '@angular/common';

export class MyTime {

  public time: Time;

  constructor(hhmmStr?: string) {

    if ( hhmmStr ) {
      const hora:   number = Number.parseInt(hhmmStr.split(':')[0], 0);
      const minuto: number = Number.parseInt(hhmmStr.split(':')[1], 0);

      this.time = {
        hours: hora,
        minutes: minuto
      };
    }
    else {
      const dataAtual = new Date();
      this.time = {
        hours: dataAtual.getHours(),
        minutes: dataAtual.getMinutes()
      };
    }
  }

  validate?(): boolean {
    return this.time &&
           this.time.hours   >= 0 && this.time.hours   <= 23 &&
           this.time.minutes >= 0 && this.time.minutes <= 59;
  }

  toString?(incluirSegundos: boolean): string {

    const _minutes: string = this.time.minutes >= 10 ? '' + this.time.minutes
                                                     : '0' + this.time.minutes;

    const _hours: string = this.time.hours >= 10 ? '' + this.time.hours
                                                 : '0' + this.time.hours;

    if ( this.validate() ) {
      if ( incluirSegundos ) {
        return _hours + ':' + _minutes + ':00';
      }
      else {
        return _hours + ':' + _minutes;
      }
    }
    return '';
  }

}
