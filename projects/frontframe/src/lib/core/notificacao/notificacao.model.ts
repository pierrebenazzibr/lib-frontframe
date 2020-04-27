import { DefaultModel } from '../framework/default.model';

export class Notificacao extends DefaultModel {
    private titulo: string;

    getTitulo(): string {
        return this.titulo;
    }

    setTitulo(titulo: string): void {
        this.titulo = titulo;
    }
}
