import {Helpers} from './../../app/helper';
import {Settings} from './../../app/app.settings';

import { Injectable } from '@angular/core';
import {
    Http,
    Response
} from '@angular/http';
import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class PresupuestoService {
    constructor(private http: Http) {}

    private actividadUrl: string = `${Settings.HOST_ROCIO()}pres_api/actividad/`;
    private partidaUrl: string = `${Settings.HOST_ROCIO()}pres_api/partida/`;
    private redUrl: string = `${Settings.HOST_ROCIO()}pres_api/red`;
    private fuenteFtoUrl: string =`${Settings.HOST_ROCIO()}pres_api/fuenteFTO`;
    private mesUrl: string = `${Settings.HOST_ROCIO()}pres_api/mes`;
    private modalidadUrl: string =`${Settings.HOST_ROCIO()}pres_api/modalidad`;
    private cargoContratacionUrl: string = `${Settings.HOST_ROCIO()}pres_api/cargoContratacion`
    private cargoFuncionalUrl: string = `${Settings.HOST_ROCIO()}pres_api/cargoFuncional`;
    private presupuestoUrl: string = `${Settings.HOST_ROCIO()}pres_apli/presupuesto`;


    getActividades(): Observable<Object>{
        return this.http.get(this.actividadUrl).map(Helpers.extractData).catch(Helpers.handleError);
    }

    getPartida():Observable<Object>{
        return this.http.get(this.partidaUrl).map(Helpers.extractData).catch(Helpers.handleError);
    }

    getRed():Observable<Object>{
        return this.http.get(this.redUrl).map(Helpers.extractData).catch(Helpers.handleError);
    }
    
    getFuenteFto():Observable<Object>{
        return this.http.get(this.fuenteFtoUrl).map(Helpers.extractData).catch(Helpers.handleError);
    }

    getMes():Observable<Object>{
        return this.http.get(this.mesUrl).map(Helpers.extractData).catch(Helpers.handleError);
    }

    getModalidad():Observable<Object>{
        return this.http.get(this.modalidadUrl).map(Helpers.extractData).catch(Helpers.handleError);       
    }

    getCargoContratacion():Observable<Object>{
        return this.http.get(this.cargoContratacionUrl).map(Helpers.extractData).catch(Helpers.handleError);
    }

    getCargoFuncional():Observable<Object>{
        return this.http.get(this.cargoFuncionalUrl).map(Helpers.extractData).catch(Helpers.handleError);
    }

    getPresupuesto():Observable<Object>{
        return this.http.get(this.presupuestoUrl).map(Helpers.extractData).catch(Helpers.handleError);
    }
}