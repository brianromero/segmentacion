import {
    Injectable
} from '@angular/core';
import {
    Http,
    Response
} from '@angular/http';
import {
    Headers,
    RequestOptions,
    RequestMethod,
    Request
} from '@angular/http';
import {
    Observable
} from 'rxjs/Observable';
// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {
    Settings
} from './../../app/app.settings';
import { Helpers } from './../../app/helper';

@Injectable()
export class GestionProyectosService {
    constructor(private http: Http) { }
    private api: string = `${Settings.HOST()}api/v1/proyectos/`;
    private api_bysistema: string = `${Settings.HOST()}api/v1/proyectos-by-sistemas/`;
    private api_siga: string = `${Settings.HOST()}proyectos_siga/`;
    private api_bysistema_post: string = `${Settings.HOST()}api/v1/proyectos_sistemas/`;
    private delete_url: string = `${Settings.HOST()}deleteProyectoSistema/`;

    get(pk: any = null): Observable<Object> {
        let url: string = pk != null ? `${this.api_bysistema}${pk}/` : this.api_bysistema;
        return this.http.get(url)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    add(data): Observable<Object> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api, body, options)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    delete(pk: any) {
        let url: string = `${this.api}${pk}/`;
        return this.http.delete(url)
            .map(_ => null)
            .catch(Helpers.handleError);
    }

    edit(pk, data): Observable<Object> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let url: string = `${this.api}${pk}/`;
        return this.http.put(url, body, options)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    getSiga(pk: any = null): Observable<Object> {
        let url: string = pk != null ? `${this.api_siga}${pk}/` : this.api_siga;
        return this.http.get(url)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    add_sistemas(data): Observable<Object> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_bysistema_post, body, options)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    deleteSistemas(pkproyecto, pksistema) {
        let url: string = `${this.delete_url}${pkproyecto}/${pksistema}/`;
        return this.http.get(url)
            .map(_ => null)
            .catch(Helpers.handleError);
    }
}