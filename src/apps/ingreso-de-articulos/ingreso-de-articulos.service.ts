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

@Injectable()
export class IngresoService {
    // private tipoingUrl: string = 'http://192.168.34.36:8000/api/v1/tipoing/';
    // private articuloUrl: string = 'http://192.168.34.36:8000/api/v1/articulo/';

    private aniosUrl: string = 'http://192.168.202.194/siga/pedidos/anio/';

    private pecosaUrl: string = 'http://192.168.34.36:8000/buscapecosa/';
    // private cabpecosaUrl: string = 'http://192.168.34.36:8000/cabpecosa/';

    //private detpecosaUrl: string = 'http://192.168.34.36:8000/detallepecosa/';
    //private detpecosaUrl: string = 'http://192.168.202.194/siga/detalle-pedidos/';
    private detpecosaUrl: string = 'http://192.168.202.194/siga/detalle-pecosas/'; //2016/00082/



    private almacenUrl: string = 'http://192.168.34.36:8000/cargaalmacen/';

    private pecosasaniourl: string = ' http://192.168.202.194/siga/pecosas/anio/';
    //http://192.168.202.194/siga/pecosas/anio/2016/?nro_pecosa=9


    private cabpecosaUrl: string = 'http://192.168.202.194/siga/pedidos/';
    //   private categoriaUrl: string = 'http://192.168.34.36:8000/api/v1/categoria/';
   // http://192.168.202.194/siga/pedidos/2016/1771/




    constructor(private http: Http) {

    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private extractData1(res: Response) {
        let body = res.json();
        return body.results || {};
    }

    private extractData2(res: Response) {
        let body = res.json();
        return body.count || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }


    getAnios(): Observable < Object > {
        //let queryparameters:string = `${anio}/`;
        let url: string = this.aniosUrl;
        return this.http.get(url).map(this.extractData).catch(this.handleError);

        // return this.http.get(url).map(this.extractData)

    }


    getNumPecosaAnio(anio: number, pecosa: string): Observable < Object > {
        let queryparameters: string = `${anio}/?nro_pecosa=${pecosa}`;
        let url: string = this.pecosasaniourl + queryparameters;
        console.log('url:' + url);
        console.log(this.http.get(url).map(this.extractData1));

        //return this.http.get(url).map(this.extractData).catch(this.handleError);
        return this.http.get(url).map(this.extractData1).catch(this.handleError);
    }



    getNumPecosa(anio: number): Observable < Object > {
        let queryparameters: string = `${anio}/`;
        let url: string = this.pecosaUrl + queryparameters;
        return this.http.get(url).map(this.extractData).catch(this.handleError)
    }


    getCabPecosa(anio: number, pecosa: string): Observable < Object > {
        
        //let queryparameters: string = `?ano_eje=${anio}&sec_ejec=&tipo_pedido=&nro_pedido=${pecosa}`;
       // http://192.168.202.194/siga/pedidos/2016/1771/
       
        let queryparameters: string = `${anio}/${pecosa}/`;


        //  let queryparameters:string = `${anio}/${pecosa}/`;
        let url: string = this.cabpecosaUrl + queryparameters;
        console.log('urlcabpecosa:' + url);
        return this.http.get(url).map(this.extractData).catch(this.handleError)
       // return this.http.get(url).map(this.extractData1).catch(this.handleError)
    }

    getDetallePecosa(anio: number, pedido: string): Observable < Object > {

        //        let queryparameters:string = `${anio}/${pecosa}/`;
        //       let url: string = this.detpecosaUrl+queryparameters;
        //      return this.http.get(url).map(this.extractData).catch(this.handleError)

        //let queryparameters:string = `?ano_eje=${anio}&sec_ejec=&tipo_bien=&tipo_pedido=&nro_pedido=${pecosa}&secuencia=&nro_pecosa=`;

        let queryparameters: string = `${anio}/${pedido}/`;

        let url: string = this.detpecosaUrl + queryparameters;
        return this.http.get(url).map(this.extractData1).catch(this.handleError)
        //return this.http.get(url).map(this.extractData1).catch(this.handleError)
    }


    getAlmacenes(): Observable < Object > {
        //let queryparameters:string = `${anio}/`;
        let url: string = this.almacenUrl;
        return this.http.get(url).map(this.extractData).catch(this.handleError);

    }



    getCabPecosacant(anio: number, pecosa: string): Observable < Object > {
        let queryparameters: string = `?ano_eje=${anio}&sec_ejec=&tipo_pedido=&nro_pedido=${pecosa}`;

        //  let queryparameters:string = `${anio}/${pecosa}/`;
        let url: string = this.cabpecosaUrl + queryparameters;
        //return this.http.get(url).map(this.extractData).catch(this.handleError)
        return this.http.get(url).map(this.extractData2).catch(this.handleError)
    }



    /* 
    getCargaTipoIngreso(): Observable < Object > {
        let url: string = this.tipoingUrl;
        return this.http.get(url).map(this.extractData).catch(this.handleError)
    }




    getCargaCategoria(catart: number): Observable < Object > {
        let queryparameters:string = `${catart}/`;
        let url: string = this.categoriaUrl+queryparameters;
        return this.http.get(url).map(this.extractData).catch(this.handleError)
    }


    getCargaArticulos(catart: number,codart: number): Observable < Object > {
        let queryparameters:string = `${catart}/${codart}/`;
        let url: string = this.articuloUrl+queryparameters;
        return this.http.get(url).map(this.extractData).catch(this.handleError)
    }





 getRegistro(url:string=''): Observable < Object > {
        let tablaUrlAux2 = this.tablaUrlAux + url;
        if(url!=''){
            return this.http.get(tablaUrlAux2).map(this.extractData)
        }else{
            return this.http.get(this.tablaUrlAux).map(this.extractData)
        }        
    }*/
}