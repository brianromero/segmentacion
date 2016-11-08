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
export class RegistroService {
    dpto_url: string = `${Settings.HOST_LOCAL()}departamentos/`;
    prov_url: string = `${Settings.HOST_LOCAL()}provincias/`;
    dist_url: string = `${Settings.HOST_LOCAL()}distritos/`;
    local_url: string = `${Settings.HOST_LOCAL()}api/local/`;
    infra_url: string = `${Settings.HOST_LOCAL()}api/infraestructura/`;
    infralocal_url: string = `${Settings.HOST_LOCAL()}api/infraestructuralocal/`;
    localinfra_url: string = `${Settings.HOST_LOCAL()}localesinfra/`;
    localinfra_ubigeo: string = `${Settings.HOST_LOCAL()}localesinfrabyUbigeo/`;

    aula_url: string = `${Settings.HOST_LOCAL()}api/aula/`;
    aula_url2: string = `${Settings.HOST_LOCAL()}aulasbylocal/`;


    constructor(private http: Http) { }

    getDepartamentos(): Observable<Object> {
        return this.http.get(this.dpto_url)
            .map(Helpers.extractData)
            .catch(Helpers.handleError)
    }

    getProvincias(ccdd: string): Observable<Object> {
        return this.http.get(`${this.prov_url}${ccdd}`)
            .map(Helpers.extractData)
            .catch(Helpers.handleError)
    }

    getDistritos(ccdd: string, ccpp: string): Observable<Object> {
        return this.http.get(`${this.dist_url}${ccdd}/${ccpp}`)
            .map(Helpers.extractData)
            .catch(Helpers.handleError)
    }

    getLocal(): Observable<Object> {
        return this.http.get(this.local_url)
            .map(Helpers.extractData)
            .catch(Helpers.handleError)
    }
    getLocalBy(pklocal): Observable<Object> {
        return this.http.get(this.localinfra_url + pklocal + '/')
            .map(Helpers.extractData)
            .catch(Helpers.handleError)
    }
    getLocalbyUbigeo(ubigeo) {
        return this.http.get(this.localinfra_ubigeo + ubigeo + '/')
            .map(Helpers.extractData)
            .catch(Helpers.handleError)
    }

    editLocal(pk, data): Observable<Object> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let url: string = `${this.local_url}${pk}/`;
        return this.http.put(url, body, options)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    addLocal(data): Observable<Object> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.local_url, body, options)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    getInfraestructura(): Observable<Object> {
        return this.http.get(this.infra_url)
            .map(Helpers.extractData)
            .catch(Helpers.handleError)
    }

    addInfraLocal(data): Observable<Object> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.infralocal_url, body, options)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    addAula(data) {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.aula_url, body, options)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    getAula(pk): Observable<Object> {
        return this.http.get(this.aula_url2+pk+'/')
            .map(Helpers.extractData)
            .catch(Helpers.handleError)
    }


}