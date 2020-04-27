import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDate'
})
export class MyDatePipe implements PipeTransform {

    constructor(private datePipe: DatePipe) {}

    transform(valor: string): any {
        return this.datePipe.transform(valor, 'dd/MM/yyyy');
    }
}
