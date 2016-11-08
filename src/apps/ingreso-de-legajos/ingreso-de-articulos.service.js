"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
// Statics
require('rxjs/add/observable/throw');
// Operators
require('rxjs/add/operator/catch');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var IngresoService = (function () {
    //   private categoriaUrl: string = 'http://192.168.34.36:8000/api/v1/categoria/';
    function IngresoService(http) {
        this.http = http;
        // private tipoingUrl: string = 'http://192.168.34.36:8000/api/v1/tipoing/';
        // private articuloUrl: string = 'http://192.168.34.36:8000/api/v1/articulo/';
        this.pecosaUrl = 'http://192.168.34.36:8000/buscapecosa/';
        this.cabpecosaUrl = 'http://192.168.34.36:8000/cabpecosa/';
        this.detpecosaUrl = 'http://192.168.34.36:8000/detallepecosa/';
        this.almacenUrl = 'http://192.168.34.36:8000/cargaalmacen/';
    }
    /*private provUrl: string = 'http://192.168.200.123:8081/segrecargaProv/';
    private distUrl: string = 'http://192.168.200.123:8081/segrecargaDis/';
    private zonaUrl: string = 'http://192.168.200.123:8081/segrecargaZona/';
    private tablaUrl: string = 'http://192.168.200.123:8081/segrecargaTabla/';
    private tablaUrlAux: string = 'http://192.168.200.123:8081/segrecargaTabla01/';*/
    /*private depaUrl: string = 'http://127.0.0.1:8000/segrecargaDepa/';
    private provUrl: string = 'http://127.0.0.1:8000/segrecargaProv/';
    private distUrl: string = 'http://127.0.0.1:8000/segrecargaDis/';
    private zonaUrl: string = 'http://127.0.0.1:8000/segrecargaZona/';
    private tablaUrlAux: string = 'http://127.0.0.1:8000/segrecargaTabla01/';*/
    // getCargaInicial(): Observable < Object >{
    //    return this.http.get(this.depaUrl).map(this.extractData).catch(this.handleError)
    // }
    /*getDepartamentos(): Observable < Object > {
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
*/
    /* getTabla(): Observable < Object > {
            return this.http.get(this.articuloUrl).map(this.extractData).catch(this.handleError)
        }
    */
    IngresoService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    IngresoService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    IngresoService.prototype.getNumPecosa = function (anio) {
        var queryparameters = anio + "/";
        var url = this.pecosaUrl + queryparameters;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    };
    IngresoService.prototype.getCabPecosa = function (anio, pecosa) {
        var queryparameters = anio + "/" + pecosa + "/";
        var url = this.cabpecosaUrl + queryparameters;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    };
    IngresoService.prototype.getDetallePecosa = function (anio, pecosa) {
        var queryparameters = anio + "/" + pecosa + "/";
        var url = this.detpecosaUrl + queryparameters;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    };
    IngresoService.prototype.getAlmacenes = function () {
        //let queryparameters:string = `${anio}/`;
        var url = this.almacenUrl;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    };
    IngresoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], IngresoService);
    return IngresoService;
}());
exports.IngresoService = IngresoService;
//# sourceMappingURL=ingreso-de-articulos.service.js.map