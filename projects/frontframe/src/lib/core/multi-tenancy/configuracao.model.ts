import { DefaultModel } from '../framework/default.model';
import { ChaveConfiguracao } from './chave-configuracao.enum';
import { Parametro } from './parametro.model';



export class Configuracao extends DefaultModel {

  chave: ChaveConfiguracao;
  descricao: string;
  parametros: Parametro[];

}
