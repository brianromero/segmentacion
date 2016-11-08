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
var core_2 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var ingreso_de_articulos_service_1 = require('./ingreso-de-articulos.service');
var forms_1 = require('@angular/forms');
var cabpecosas_interface_1 = require('./cabpecosas.interface');
var IngresodeArticulos = (function () {
    function IngresodeArticulos(ingresoservice, elementRef, router) {
        this.ingresoservice = ingresoservice;
        this.elementRef = elementRef;
        this.router = router;
        this.inpnumpecosa = '';
        this.url = '';
        this.urlProcesar = '';
        this.dato = '111';
        this.empty = '';
        this.cabpeco = new cabpecosas_interface_1.CabPecosasInterface();
        var fecha = new Date();
        var anio = fecha.getFullYear();
        this.cargaAlmacen();
        this.cargaPecosas(anio);
        // this.valor='';
        // this.cabpecosa=this.model;
        // console.log(anio);
    }
    IngresodeArticulos.prototype.cargaPecosas = function (anio) {
        //document.getElementById("numpecosa").value('');
        var _this = this;
        //var e=(<HTMLInputElement>document.getElementById("Prueba")).value; 
        // var e = document.getElementById<HTMLInputElement>("Prueba").value;
        this.ingresoservice.getNumPecosa(anio).subscribe(function (res) {
            _this.pecosas = res;
            //consolo.log(e);
            //this.inpnumpecosa = 'numero';
            // this.peco=this.pecosas.idpecosa;
            // this.dato='hola!';   
        });
    };
    IngresodeArticulos.prototype.cargaAlmacen = function () {
        var _this = this;
        this.ingresoservice.getAlmacenes().subscribe(function (res) {
            _this.almacenes = res;
            // this.peco=this.pecosas.idpecosa;
            // this.dato='hola!';   
        });
    };
    IngresodeArticulos.prototype.cargaCabPecosa = function (anio, pecosa) {
        var _this = this;
        this.peco = pecosa;
        console.log(pecosa);
        if (this.peco != 0) {
            this.ingresoservice.getCabPecosa(anio, pecosa).subscribe(function (res) {
                _this.cabpecosa = res;
                _this.cabpeco.idpecosa = _this.cabpecosa[0].idpecosa;
                _this.cabpeco.anio = _this.cabpecosa[0].anio;
                //this.model.idpecosa=this.cabpecosa.idpecosa;
                /*
                 console.log(this.cabpecosa[0].idpecosa)
                 console.log(this.cabpecosa[0].anio)
                 this.dato='hola!';*/
                _this.cargaReporte(anio, pecosa);
            });
        }
        else {
            alert("Ingrese un número de Pecosa");
        }
    };
    IngresodeArticulos.prototype.cargaReporte = function (anio, pecosa) {
        var _this = this;
        this.peco = pecosa;
        if (this.peco != 0) {
            this.ingresoservice.getDetallePecosa(anio, pecosa).subscribe(function (res) {
                _this.detpecosas = res;
                _this.dato = 'hola!';
            });
        }
        else {
            alert("Ingrese un número de Pecosa");
        }
    };
    IngresodeArticulos.prototype.procesar = function (valor) {
        //console.log(valor)
    };
    IngresodeArticulos = __decorate([
        core_1.Component({
            templateUrl: 'app/apps/ingreso-de-articulos/ingreso-de-articulos.html',
            providers: [ingreso_de_articulos_service_1.IngresoService]
        }), 
        __metadata('design:paramtypes', [ingreso_de_articulos_service_1.IngresoService, core_1.ElementRef, router_1.Router])
    ], IngresodeArticulos);
    return IngresodeArticulos;
}());
var routes = [{
        path: '',
        component: IngresodeArticulos
    }];
var IngresodeArticulosModule = (function () {
    function IngresodeArticulosModule() {
    }
    IngresodeArticulosModule = __decorate([
        core_2.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule.forChild(routes), forms_1.FormsModule],
            declarations: [IngresodeArticulos]
        }), 
        __metadata('design:paramtypes', [])
    ], IngresodeArticulosModule);
    return IngresodeArticulosModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IngresodeArticulosModule;
//# sourceMappingURL=ingreso-de-articulos.module.js.map