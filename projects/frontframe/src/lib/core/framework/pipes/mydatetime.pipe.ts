import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDatetime'
})
export class MyDatetimePipe implements PipeTransform {

    constructor(private datePipe: DatePipe) {}

    transform(valor: string): string {
        return this.datePipe.transform(valor, 'dd/MM/yyyy hh:mm:ss');
    }
}
