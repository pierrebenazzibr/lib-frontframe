// necessário tirar da classe http-interceptor.service.ts para evitar erro de dependência cíclica com o autenticacaoService ( quando a autenticaService precisar fazer um skip de header )
export const InterceptorSkipHeader = 'X-Skip';
