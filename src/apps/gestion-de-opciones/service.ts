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
import {Helpers} from './../../app/helper';

@Injectable()
export class GestionOpcionesService {
    constructor(private http: Http) {}
    private opciones_url: string = `${Settings.HOST()}api/v1/permisos/`;

    getOpciones(): Observable < Object > {
        return this.http.get(this.opciones_url)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }
    getOpciones_detail(pk): Observable < Object > {
        return this.http.get(this.opciones_url + pk)
            .map(Helpers.extractData)
            .catch(Helpers.handleError)
    }

    addOpcion(data):Observable<Object>{
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.opciones_url, body, options)
                    .map(Helpers.extractData)
                    .catch(Helpers.handleError);
    }

    editOpcion(pk,data):Observable<Object>{
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.opciones_url+pk+'/', body, options)
                    .map(Helpers.extractData)
                    .catch(Helpers.handleError);
    }
    
}