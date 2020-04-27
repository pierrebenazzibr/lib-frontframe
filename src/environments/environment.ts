// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  url_configuracao: '/api/integracao/v1/configuracoes',
  nomeVersao: '1.3.2-RC1-20200215',
  app_name: 'Healthlog',
  caminho_pagina_inicial: '/homecare/rota-lista',
  caminho_pagina_login: '/login',
  url_manual_healthlog: 'https://docs.google.com/document/d/1_RsaOHe5_Uct58hHqPkiyBgGkd-9zGbaUvfBslHH8Oo/edit?usp=sharing',

  production: false,
  localizador_max_size: 10,
  paginacao_size: 10,
  default_debounce_time: 800,
  credencial_api_authorization_header_basic: 'Z2VvbWVkOkBnMzBtM2RA',

  // dev
  url_healthlog_api: 'http://localhost:8085',
  url_app_gmap: 'http://localhost:8081/gmap'

  // qas
  // url_healthlog_api: 'https://healthlog-api-homolog.healthmap.com.br',
  // url_app_gmap: 'https://gmap-homolog.healthmap.com.br'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
