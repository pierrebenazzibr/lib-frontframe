export class Constantes {

  static url_configuracao = '/api/integracao/v1/configuracoes';
  static nomeVersao = '1.3.2-RC1-20200215';
  static app_name = 'Healthlog';
  static caminho_pagina_inicial = '/homecare/rota-lista';
  static caminho_pagina_login = '/login';
  static url_manual_healthlog = 'https://docs.google.com/document/d/1_RsaOHe5_Uct58hHqPkiyBgGkd-9zGbaUvfBslHH8Oo/edit?usp=sharing';

  static production = false;
  static localizador_max_size = 10;
  static paginacao_size = 10;
  static default_debounce_time = 800;
  static credencial_api_authorization_header_basic = 'Z2VvbWVkOkBnMzBtM2RA';

  // dev
  static url_healthlog_api = 'http://localhost:8085';
  static url_app_gmap = 'http://localhost:8081/gmap';
}
