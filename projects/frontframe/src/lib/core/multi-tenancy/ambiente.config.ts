export class AmbienteConfig {

    private static ambientesKeyds = new Map<string, string>()

    // ----  PRD  ----
    .set('https://admhealthmap.healthmap.com.br', 'adm')

    // ----  QAS  ----
    .set('https://app02-homolog.healthmap.com.br', 'hmg')

    // ----  DEV  ----
    .set('http://localhost:4200', 'dev')
    ;


  constructor() { }

  public static getKeyDS(log: boolean): string {
    const keyDS = AmbienteConfig.ambientesKeyds.get(document.location.origin);
    if (log) {
      console.log('ambiente.config: getKeyDs: location = ' + document.location.origin + ' , keyDS: ' + keyDS);
    }
    if (!keyDS) {
      console.error('favor verificar as configuracoes de ambiente. URL nao encontrada: ' + document.location.origin);
      alert('URL não encontrada na configuração de ambiente.');
    }
    return keyDS;
  }
}
