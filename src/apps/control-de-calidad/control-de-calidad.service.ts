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
import { Helpers } from './../../app/helper';
import {
  IndicadoresInterface
} from './IndicadoresInterface.interface';

@Injectable()
export class ControldecalidadService {
    constructor(private http: Http) {}
    private cargo: string = 'DEPARTAMENTAL';
    private depaUrl: string = 'http://bromero.inei.com.pe:8000/recargaDepa/';
    private provUrl: string = 'http://bromero.inei.com.pe:8000/recargaProv/';
    private distUrl: string = 'http://bromero.inei.com.pe:8000/recargaDis/';
    private zonaUrl: string = 'http://bromero.inei.com.pe:8000/recargaZona/';
    private tablaUrlAux: string = 'http://bromero.inei.com.pe:8000/calidadrecargaTabla01/';
    private tablaUrlAux2: string = 'http://bromero.inei.com.pe:8000/calidadrecargaTabla02/';
    private tablaUrlAux4: string = 'http://bromero.inei.com.pe:8000/CalidadList/';
    private tablaReporte: string = 'http://bromero.inei.com.pe:8000/tablaReporte/';
    private tablaIndicador: string = 'http://bromero.inei.com.pe:8000/tablaIndicador/';

    private guardarObservaciones: string = 'http://bromero.inei.com.pe:8000/tablaIndicador2/';
    private guardarIndicador: string = 'http://bromero.inei.com.pe:8000/tablaIndicador3/';

    getCargaDepaInicial(): Observable < Object >{
        return this.http.get(this.depaUrl).map(this.extractData).catch(this.handleError)
    }

    getDepartamentos(): Observable < Object > {
        return this.http.get(this.depaUrl).map(this.extractData).catch(this.handleError)
    }

    getProvincias(ccdd: string, ccpp:string): Observable < Object > {
        let queryparameters:string = `${ccdd}/${ccpp}/`;
        let url: string = this.provUrl+queryparameters;
        return this.http.get(url).map(this.extractData).catch(this.handleError)
    }

    getDistritos(ccdd: string, ccpp:string, ccdi:string): Observable < Object > {
        let queryparameters:string = `${ccdd}/${ccpp}/${ccdi}/`;
        let url: string = this.distUrl + queryparameters;
        return this.http.get(url).map(this.extractData).catch(this.handleError)
    }

    getZonas(ubigeo: string): Observable < Object > {
        let queryparameters:string = `${ubigeo}/`;
        let url: string = this.zonaUrl + queryparameters;
        return this.http.get(url).map(this.extractData).catch(this.handleError)
    }

    getTabla(area: string = "0", tipo: string = "0", ccdd: string = "0", ccpp: string = "0", ccdi: string = "0", zona: string = "0"): Observable<Object> {
        let session = Helpers.getJsonSession();
        let ccdd_s = session[0].ccdd == '00' ? ccdd : session[0].ccdd;
        let ccpp_s = session[0].ccpp == '00' ? ccpp : session[0].ccpp;
        let ccdi_s = session[0].ccdi == '00' ? ccdi : session[0].ccdi;
        let zona_s = session[0].zona == '0' ? zona : session[0].zona;
        let queryparameters: string;
        if (ccdd_s != "00" && tipo == '0') {
            tipo = '1';
            queryparameters = `${area}/${tipo}/${ccdd_s}/${ccpp_s}/${ccdi_s}/${zona_s}/`;
        } else {
            queryparameters = `${area}/${tipo}/${ccdd_s}/${ccpp_s}/${ccdi_s}/${zona_s}/`;
        }
        let url: string = this.tablaUrlAux + queryparameters;
        return this.http.get(url).map(this.extractData).catch(this.handleError)
    }

    getTablaAux(tipo: string="0", ccdd: string="0", ccpp: string="0", ccdi: string="0"): Observable < Object > {
        let queryparameters:string = `${tipo}/${ccdd}${ccpp}${ccdi}/`;
        let url:string = this.tablaReporte + queryparameters;
        return this.http.get(url).map(this.extractData).catch(this.handleError)
    }

    private extractData(res: Response) {
        let body = res.json();
        let session = Helpers.getJsonSession();
        session = session[0];
        let resultado: Array<Object> = [];
        let usuario_ubigeo = { ccdd: session.ccdd, ccpp: session.ccpp, ccdi: session.ccdi, zona: session.zona }
        if (usuario_ubigeo.ccpp == '00' || usuario_ubigeo.ccdi == '00' || usuario_ubigeo.zona == '00000') {
            this.cargo = 'DEPARTAMENTAL';
        } else if (usuario_ubigeo.ccpp != '00' || usuario_ubigeo.ccdi == '00' || usuario_ubigeo.zona == '00000') {
            this.cargo = 'PROVINCIAL';
        } else if (usuario_ubigeo.ccdi != '00' || usuario_ubigeo.zona == '00000') {
            this.cargo = 'DISTRITAL';
        } else if (usuario_ubigeo.zona != '00000') {
            this.cargo = 'ZONAL';
        }
        resultado = Helpers.findUbigeoByBody(body);
        return resultado || {};
    }
    
    /*private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }*/

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    
    getRegistro(url:string=''): Observable < Object > {
        let tablaUrlAux3 = this.tablaUrlAux2 + url;
        if(url!=''){
            return this.http.get(tablaUrlAux3).map(this.extractData).catch(this.handleError)
        }else{
            return this.http.get(tablaUrlAux3).map(this.extractData).catch(this.handleError)
        }        
    }

    obtenerIndicadores(area: string="",ubigeo: string="", zona: string="", aeu: string=""){
        let queryparameters:string = `${area}/${ubigeo}/${zona}/${aeu}/`;
        let url:string = this.tablaIndicador + queryparameters;
        return this.http.get(url).map(this.extractData).catch(this.handleError)
    }

    guardarObservacion(data): Observable < Object > {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.guardarObservaciones, body, options).map(Helpers.extractData).catch(Helpers.handleError);
    }

    guardarIndicadores(data): Observable < Object > {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.guardarIndicador, body, options).map(Helpers.extractData).catch(Helpers.handleError);
    }
}