import {
  AfterViewInit,
  ElementRef,
  Component
} from '@angular/core';
import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule,
  Router
} from '@angular/router';
import {
  CommonModule
} from '@angular/common';
import {
  IngresoService
} from './ingreso-de-articulos.service';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  FormsModule
} from '@angular/forms';

import {
  ArticuloInterface
} from './articulo.interface';
import {
  PecosaInterface
} from './pecosa.interface';

import {
  PecosaxAnioInterface
} from './pecosaxanio.interface';

import {
  DetPecosaInterface
} from './detpecosa.interface';
import {
  AlmacenInterface
} from './almacen.interface';

import {
  CabPecosasInterface
} from './cabpecosas.interface';


import {
  AnioInterface
} from './anio.interface';

import {
  CuentaPecosaInterface
} from './cuentapecosa.interface';




import {
  Helpers
} from './../../app/helper';

declare var jQuery: any;

@Component({
  templateUrl: 'ingreso-de-articulos.html',
  providers: [IngresoService]
})

class IngresodeArticulos {

  private inpnumpecosa: string = '';
  private url: string = '';
  private urlProcesar: string = '';
  private dato: string = '';
  private peco: number;

  private valor: string;

  private articulos: Object;
  private articulo: ArticuloInterface;

  private cabpecosas: Object;
  private cabpecosa: CabPecosasInterface;


  private anios: AnioInterface;

  private pecosas: PecosaInterface;

  private pecosasxanio: PecosaxAnioInterface;

  private x: PecosaxAnioInterface;

  private detpecosas: DetPecosaInterface;
  private almacenes: AlmacenInterface;

  private nropecosa: number;
  private num_art: any;


  private empty: string = '';
  private anioActual: number = 0;
  private numpecosa_value: string;



  private cuentapecosas: CuentaPecosaInterface;





  constructor(private ingresoservice: IngresoService, private elementRef: ElementRef, private router: Router) {
    var fecha = new Date();
    var anio = fecha.getFullYear();
    this.anioActual = anio;
    console.log(anio);
    this.cargaAnios();

    //this.cabpecosa = this.cabpeco;
    //this.seteaControl('selectanio',anio); 

    //(<HTMLInputElement>document.getElementById('input1')).value = anio.toString();

    //llenado de pecosas por año
    // this.cargaPecosasAnio(anio,'documento');


    // this.valor='';
    //(<HTMLInputElement>document.getElementById('documento')).value = valor;
    // this.cabpecosa=this.model;
    // console.log(anio);

    //(<HTMLSelectElement>document.getElementById('selectanio')).value = anio.toString();

  }



  cargaPecosas(anio: any, idcontrol: any) {

    // (<HTMLInputElement>'input1').value= anio.toString();



    if (idcontrol != '') {
      // console.log('jhola');  
      //this.seteaControl(idcontrol, '');
      //this.seteaControl('documento','');
    }

    this.pecosas = null;

    this.ingresoservice.getNumPecosa(anio).subscribe(res => {
      this.pecosas = < PecosaInterface > res;

    })
  }


  changedata(valor: string) {

    this.valor = valor;
    console.log('valor:' + valor);
  }

  cargaPecosasAnio(anio: any, pecosa: string) {



    this.pecosas = null;

    this.ingresoservice.getNumPecosaAnio(anio, pecosa).subscribe(res => {
      this.pecosasxanio = < PecosaxAnioInterface > res;


    })
  }

 


  muestra(muestra: string) {
    alert(muestra);
  }

  descargarExcel(id, nom) {
    Helpers.descargarExcel(id, nom);
  }

  cargaAnios() {
    // console.log('años');
    this.ingresoservice.getAnios().subscribe(res => {
      this.anios = < AnioInterface > res;
      // this.peco=this.pecosas.idpecosa;
      // this.dato='hola!';   
    })
  }



  cargaAlmacen() {
    this.ingresoservice.getAlmacenes().subscribe(res => {
      this.almacenes = < AlmacenInterface > res;
      // this.peco=this.pecosas.idpecosa;
      // this.dato='hola!';   
    })
  }


  cabpeco = new CabPecosasInterface();



  cargaCabPecosa(pecosa: string,anio: number) {

    //if (event.key == "Enter" || event.key == "Click") {
    console.log('cargapecosa'+ pecosa);
    console.log('length:'+pecosa.length);

    this.numpecosa_value = ''
    //this.peco = pecosa;
    if (pecosa.length>0) {
      console.log('prueba: ' + anio + '-' + pecosa);
      this.ingresoservice.getCabPecosa(anio, pecosa).subscribe(res => {
        console.log(res);
        this.cabpecosa = < CabPecosasInterface > res;
        //console.log(this.cabpecosas);


        console.log('asigna pecosas: ' + pecosa);

        this.cabpeco.nro_pedido = this.cabpecosa.nro_pedido;

       console.log('X:' + this.cabpeco.nro_pedido); 
     // console.log(this.cabpeco.nro_pedido);
        if(this.cabpeco.nro_pedido !='')
        {
          /*
            this.numpecosa_value = pecosa.toString();
            // this.cabpeco.id = this.cabpecosa[0].id;
            this.cabpeco.ano_eje = this.cabpecosa[0].ano_eje;
            this.cabpeco.motivo_pedido = this.cabpecosa[0].motivo_pedido;
            this.cabpeco.empleado = this.cabpecosa[0].empleado;
            
            this.cabpeco.fecha_pedido = this.cabpecosa[0].fecha_pedido;
            this.cabpeco.fecha_reg = this.cabpecosa[0].fecha_reg;
*/
             this.numpecosa_value = pecosa.toString();
            // this.cabpeco.id = this.cabpecosa[0].id;
            this.cabpeco.ano_eje = this.cabpecosa.ano_eje;
            this.cabpeco.motivo_pedido = this.cabpecosa.motivo_pedido;
            this.cabpeco.empleado = this.cabpecosa.empleado;            
            this.cabpeco.fecha_pedido = this.cabpecosa.fecha_pedido;
            this.cabpeco.fecha_reg = this.cabpecosa.fecha_reg;

            this.cargaReporte(anio, this.cabpeco.nro_pedido);

        }
        else
        {   
          this.numpecosa_value =null;


      //var.document

          //this.cabpeco=null;
          this.detpecosas=null;
            alert("No se encontró ninguna pecosa con ese número");
          

        }


      

      })
    } else {
      alert("Ingrese un número de Pecosa");
    }

  }





/*
  capturaEvento(event, anio) {

    var pecosa = event.target.value;
    console.log('event enter: ' + pecosa);

    this.ingresoservice.getNumPecosaAnio(anio, pecosa).subscribe(res => {
      // this.ingresoservice.getNumPecosaAnio(anio, pecosa).subscribe(res => {
      console.log(res);
      this.pecosasxanio = < PecosaxAnioInterface > res;

      var count = 0;
      //console.log(Object.keys(res).length);

      if (Object.keys(res).length === 0) {
        this.numpecosa_value = null;
        this.cabpecosa = null;
        this.detpecosas = null;

        alert('No se encontraron pecosas con el número ingresado');
      } else if (Object.keys(res).length === 1) {
        console.log('encuentra 1');

        this.cargaCabPecosa(this.pecosasxanio[0].ano_eje, this.pecosasxanio[0].nro_pedido, this.pecosasxanio[0].nro_pecosa);



        this.pecosasxanio = null;
      } else {
        console.log('encuentra mas de 1');
        this.pecosasxanio = null;
        this.cargaPecosasAnio(anio, pecosa);
      }
    })

  }
*/

  cargaReporte(anio: number, pecosa: string) {


    this.ingresoservice.getDetallePecosa(anio, pecosa).subscribe(res => {
      this.detpecosas = < DetPecosaInterface > res;

      //this.dato = 'hola!';
    })

  }


  CargaAlmacen(anio: number, pecosa: number, pedido: number) {
    /*
        if(buscaPecosa()=1)

        {
            alert("La Pecosa ya fue procesada hacia el alamecén");

        }
        else
        {


        }
        //console.log(valor)
      
    */
  }





  /*
   cargaArticulo() {
      this.ingresoservice.getCargaArticulos().subscribe(res => {
        this.articulos = <ArticuloInterface>res;
        console.log(this.pecosas)
        this.rows.push()
      })
    }
  */


  /*
  cargarDepa() {
    this.segmentacionservice.getDepartamentos().subscribe(res => {
      this.departamentos = <DepartamentoInterface>res;
    })
    this.hola()
  }

  cargarProvincias(ccdd: string, ccpp: string = "0") {
    this.ccdd = ccdd;
    this.distrito=false;
    this.verZona=false;
    if(this.ccdd!=0){
      this.segmentacionservice.getProvincias(ccdd, ccpp).subscribe(res => {
        this.provincias = < ProvinciaInterface > res;
      })
      this.cargarTabla("1",ccdd,"0","0","0")
    }else{
      this.cargarTabla("0","0","0","0","0")
    }
  this.hola()
  }

  cargarDistritos(ccpp: string) {
    this.ccpp=ccpp;
    this.distrito=false;
    this.verZona=false;
    if(this.ccpp!=0){
      this.segmentacionservice.getDistritos(this.ccdd, ccpp,"0").subscribe(res => {
        this.distritos = < DistritoInterface > res;
      })
      this.cargarTabla("2",this.ccdd,ccpp,"0","0")
    }else{
      this.cargarTabla("1",this.ccdd,"0","0","0")
    }
    
  }

  cargarZonas(ccdi: string) {
    this.ccdi = ccdi;
    this.verZona=false;
    let ubigeo = this.ccdd + this.ccpp + ccdi;
    this.distrito = true;
    if(this.ccdi!=0){
      this.segmentacionservice.getZonas(ubigeo).subscribe(res => {
        this.zonas = < ZonaInterface > res;
      })
      this.cargarTabla("3",this.ccdd,this.ccpp,this.ccdi,"0")
    }else{
      this.distrito=false;
      this.cargarTabla("2",this.ccdd,this.ccpp,"0","0")
    }
  }

  cargarAeu(zona: string) {
    this.verZona=true;
    this.zona=zona;
    if(zona!="0"){
      this.cargarTabla("4",this.ccdd,this.ccpp,this.ccdi,this.zona)
    }else{
      this.verZona=false;
      this.cargarTabla("3",this.ccdd,this.ccpp,this.ccdi,"0")
    }
  }
*/

  //cargarTabla(tipo: string, ccdd: string, ccpp: string, ccdi: string, zona: string){
  /* cargarTabla(){
    this.ingresoservice.getTabla().subscribe(res => {
      console.log(res)
    })
    
    
  }
*/
  /*
    getRegistro() {
      //no he validado si es necesaria esta línea
      this.url='';
      this.url = '4/' + this.ccdd + '/' + this.ccpp + '/' + this.ccdi + '/' + this.zona + '/';
      this.segmentacionservice.getRegistro(this.url).subscribe((data) => {
        this.registro = < RegistroInterface > data
        this.model.DEPARTAMENTO = this.registro[0].DEPARTAMENTO;
        this.model.PROVINCIA = this.registro[0].PROVINCIA;
        this.model.DISTRITO = this.registro[0].DISTRITO;
        this.model.NUM_SEC = this.registro[0].NUM_SEC;
        this.model.NUM_AEU = this.registro[0].NUM_AEU;
        this.model.ZONA = this.registro[0].ZONA;
        this.model.EST_SEG = this.registro[0].EST_SEG;
      })
    }

    procesarSeg(){
      this.urlProcesar = '';
      if(this.zona!='0'){
        this.urlProcesar = this.ccdd + '/' + this.ccpp + '/' + this.ccdi + '/' + this.zona + '/';
      }else{
        this.urlProcesar = this.ccdd + '/' + this.ccpp + '/' + this.ccdi + '/0/';
      }
      /*this.segmentacionservice.getRegistro(this.url).subscribe((data) => {
        
      })
    }*/

}

const routes: Routes = [{
  path: '',
  component: IngresodeArticulos
}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  declarations: [IngresodeArticulos]
})
export default class IngresodeArticulosModule {}