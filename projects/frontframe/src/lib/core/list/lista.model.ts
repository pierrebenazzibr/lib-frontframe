import { ListaResultset } from './lista-resultset.interface';
import { Metadata } from './metadata/metadata.component';

export interface Lista {
    idLista?: string;
    resultset: ListaResultset<any>;
    cols: Metadata[];
}
