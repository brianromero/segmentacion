import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Settings } from './../../app/app.settings';
import { Helpers } from './../../app/helper';

@Injectable()
export class SistemasService {
    constructor(private http: Http) { }
    api: string = `${Settings.HOST()}api/v1/sistemas/`;

    get(pk: string = null): Observable<Object> {
        let url: string
        url = pk != null ? `${this.api}${pk}/` : this.api;
        return this.http.get(url)
            .map(Helpers.extractData)
            .catch(Helpers.extractData);
    }

    add(data): Observable<Object> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api, body, options)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }
    edit(pk,data): Observable<Object> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let url: string = `${this.api}${pk}/`;
        return this.http.put(url, body, options)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    delete(pk): Observable<Object> {
        let url: string = `${this.api}${pk}/`;
        return this.http.delete(url)
            .map(() => null)
            .catch(Helpers.handleError)
    }
}