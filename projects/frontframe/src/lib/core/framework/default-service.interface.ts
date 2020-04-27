import { HttpHeaders, HttpParams } from '@angular/common/http';


export interface IPageableParams {
  page?: number;
  size?: number;
  sort?: any;
}

export interface DefaultFilter extends IPageableParams {
  status?: string;
}

export class DefaultServiceInterface {
    public httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
        })
    };

    public static converterFiltroParaHttpParam(filter: any, params?: HttpParams): HttpParams {
        if (!params) {
            params = new HttpParams();
        }
        if (filter) {
            Object.keys(filter).forEach(key => {
                params = params.append(key, filter[key]);
            });
        }
        return params;
    }
}
