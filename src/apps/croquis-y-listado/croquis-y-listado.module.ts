import {
  AfterViewInit, ElementRef, Component
} from '@angular/core';
import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CommonModule
} from '@angular/common';
import {
  CroquisylistadoService
} from './croquis-y-listado.service';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  FormsModule
} from '@angular/forms';
import {
  ZonaInterface
} from './zona.interface';
import {
  ProvinciaInterface
} from './provincia.interface';
import {
  DistritoInterface
} from './distrito.interface';
import {
  DepartamentoInterface
} from './departamento.interface';
import { Helpers } from './../../app/helper';
import {
  RegistroInterface
} from './registro.interface';
import {
  RegistroInterfaceRural
} from './registrorural.interface';
import 'jszip';
import { DomSanitizer } from "@angular/platform-browser";
import { DataTableModule, SharedModule, ButtonModule } from 'primeng/primeng';
import { ToastyModule, ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';


declare var jQuery;


@Component({
  templateUrl: 'croquis-y-listado.html',
  styles: [`.intro { 
    background-color: #A9E2F3;
  }`],
  providers: [CroquisylistadoService]
})

class Croquisylistado {

  private ccdd: any;
  private ccpp: any;
  private ccdi: any;
  private zona: any = 0;
  private urbanoZona: boolean = true;
  private ruralZona: boolean = false;
  private verDistrito: boolean = false;
  private seccion: any = 0;
  private aeu: any = 0;
  private area: string = "0";
  private verZona = false;
  private url: string = '';
  private urlCroquis: any;
  private urlProcesar: any;
  private tipo_cro: number = 0;
  private tabledata: boolean = false;
  private seccionAux: boolean = false;
  private aeuAux: boolean = false;
  private aeuAuxRural: boolean = false;
  private distrito: boolean = false;
  private registros: Object;
  private registros2: Object;
  private registro: RegistroInterface;
  private departamentos: DepartamentoInterface;
  private provincias: ProvinciaInterface;
  private distritos: DistritoInterface;
  private zonas: ZonaInterface;

  private nombreDepa: string = "";
  private nombreDist: string = "";
  private nombreProv: string = "";

  private urlSeccion: any = "";
  private urlEmpadronador: any = "";

  private urlSeccionRural: any = "";
  private urlEmpadronadorRural: any = "";

  constructor(private croquisylistado: CroquisylistadoService,
    private elementRef: ElementRef,
    private domSanitizer: DomSanitizer,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig) {
    this.cargarDepa()
    this.cargarTabla("0", "0", "0", "0", "0")
    this.registro = this.model
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = "center-center";
  }

  model = new RegistroInterface();

  cargarDepa() {
    this.croquisylistado.getDepartamentos().subscribe(res => {
      this.departamentos = <DepartamentoInterface>res;
    })
  }

  cargarProvincias(ccdd: string, ccpp: string = "0") {
    this.ccdd = ccdd;
    this.distrito = false;
    this.verZona = false;
    this.verDistrito = false;
    if (this.ccdd != 0) {
      this.croquisylistado.getProvincias(ccdd, ccpp).subscribe(res => {
        this.provincias = <ProvinciaInterface>res;
      })
      this.cargarTabla("1", ccdd, "0", "0", "0")
    } else {
      this.provincias = null;
      this.distritos = null;
      this.zonas = null;
      this.cargarTabla("0", "0", "0", "0", "0")
    }
  }

  cargarDistritos(ccpp: string) {
    this.ccpp = ccpp;
    this.distrito = false;
    this.verZona = false;
    this.verDistrito = false;
    if (this.ccpp != 0) {
      this.croquisylistado.getDistritos(this.ccdd, ccpp, "0").subscribe(res => {
        this.distritos = <DistritoInterface>res;
      })
      this.cargarTabla("2", this.ccdd, ccpp, "0", "0")
    } else {
      this.distritos = null;
      this.zonas = null;
      this.cargarTabla("1", this.ccdd, "0", "0", "0")
    }
  }

  cargarZonas(ccdi: string) {
    this.ccdi = ccdi;
    this.verZona = false;
    let ubigeo = this.ccdd + this.ccpp + ccdi;
    this.distrito = true;
    if (this.area == "1") {
      this.verDistrito = true;
      this.getRuta();
    }
    if (this.ccdi != 0) {
      this.croquisylistado.getZonas(ubigeo).subscribe(res => {
        this.zonas = <ZonaInterface>res;
      })
      this.cargarTabla("3", this.ccdd, this.ccpp, this.ccdi, "0")
    } else {
      this.zonas = null;
      this.distrito = false;
      this.cargarTabla("2", this.ccdd, this.ccpp, "0", "0")
    }
  }

  cambiarArea(area: string) {
    this.distrito = false;
    this.area = area;
    this.verDistrito = false;
    this.verZona = false;
    if (this.area == "0") {
      this.urbanoZona = true;
      this.ruralZona = false;
    } else {
      this.urbanoZona = false;
      this.ruralZona = true;
    }
    this.cargarDepa()
    this.cargarTabla("0", "0", "0", "0", "0")
    this.provincias = null;
    this.distritos = null;
    this.zonas = null;
  }

  cargarAeu(zona: string) {
    this.verZona = true;
    this.zona = zona;
    if (zona != "0") {
      this.cargarTabla("4", this.ccdd, this.ccpp, this.ccdi, this.zona)
    } else {
      this.verZona = false;
      this.cargarTabla("3", this.ccdd, this.ccpp, this.ccdi, "0")
    }
    this.getRuta()
  }

  cargarTabla(tipo: string, ccdd: string, ccpp: string, ccdi: string, zona: string) {
    this.croquisylistado.getTabla(this.area, tipo, ccdd, ccpp, ccdi, zona).subscribe(res => {
      this.tabledata = true;
      this.registros = <RegistroInterface>res;
      this.nombreDepa = this.registros[0].DEPARTAMENTO;
      this.nombreProv = this.registros[0].PROVINCIA;
      this.nombreDist = this.registros[0].DISTRITO;
    })
  }

  destruir() {
    jQuery('#modal_calidad').modal('show');
    if (this.area == "0") {
      jQuery("#combo_urbano").val('0');
    } else {
      jQuery("#combo_rural").val('1');
    }
  }

  getRegistro(tipo_cro) {
    this.tipo_cro = tipo_cro;
    if (this.area == "0") {
      if (this.tipo_cro == 0) {
        this.seccionAux = false;
        this.aeuAux = false;
        this.getRuta();
      }
      if (this.tipo_cro == 1) {
        this.seccionAux = true;
        this.aeuAux = false;
        this.cambiarPdfSeccion(1);
      }
      if (this.tipo_cro == 2) {
        this.seccionAux = true;
        this.aeuAux = true;
        this.cambiarPdfAeu(1, 1);
      }
      this.url = this.area + '/' + this.tipo_cro + '/' + this.ccdd + '/' + this.ccpp + '/' + this.ccdi + '/' + this.zona + '/';
      this.croquisylistado.getRegistro(this.url).subscribe((data) => {
        this.registros2 = <RegistroInterface>data;
      })
    } else {
      this.url = this.area + '/' + this.tipo_cro + '/' + this.ccdd + '/' + this.ccpp + '/' + this.ccdi + '/' + "0" + '/';
      this.croquisylistado.getRegistro(this.url).subscribe((data) => {
        this.registros2 = <RegistroInterfaceRural>data;
      });
      this.croquisylistado.getRegistro(this.url).subscribe((data) => {
        if (this.tipo_cro == 1) {
          this.aeuAuxRural = false;
          this.cambiarPdfSeccion(this.registros2[0].NUM_SEC);
        }
        if (this.tipo_cro == 2) {
          this.aeuAuxRural = true;
          this.cambiarPdfAeu(this.registros2[0].NUM_SEC, this.registros2[0].NUM_AERS);
        }        
      });
    }
  }

  getRuta() {
    let ubigeo = this.ccdd + this.ccpp + this.ccdi;
    if (this.area == "0") {
      let urlCroquisAux = this.ccdd + this.ccpp + this.ccdi + this.zona;
      this.urlCroquis = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://192.168.221.123/desarrollo/cpv2017/segm_esp/urbano/${ubigeo}/${this.zona}/${urlCroquisAux}.pdf`);
      this.urlSeccion = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://172.16.2.205:8000/descargarPdf/${ubigeo}/${this.zona}/1/${this.area}/`);
      this.urlEmpadronador = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://172.16.2.205:8000/descargarPdf/${ubigeo}/${this.zona}/2/${this.area}/`);
    } else {
      let urlCroquisAux = this.ccdd + this.ccpp + this.ccdi;
      this.urlCroquis = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://192.168.221.123/desarrollo/cpv2017/segm_esp/rural/${ubigeo}/${urlCroquisAux}.pdf`);
      this.urlSeccionRural = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://172.16.2.205:8000/descargarPdf/${ubigeo}/0/1/${this.area}/`);
      this.urlEmpadronadorRural = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://172.16.2.205:8000/descargarPdf/${ubigeo}/0/2/${this.area}/`);
    }
  }

  cambiarPdfSeccion(seccion) {
    this.seccion = seccion;
    let ubigeo = this.ccdd + this.ccpp + this.ccdi;
    if (this.area == "0") {
      let urlCroquisAux = this.ccdd + this.ccpp + this.ccdi + this.zona + ('00' + this.seccion).slice(-3);
      this.urlCroquis = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://192.168.221.123/desarrollo/cpv2017/segm_esp/urbano/${ubigeo}/${this.zona}/${urlCroquisAux}.pdf`);
    } else {
      let urlCroquisAux = this.ccdd + this.ccpp + this.ccdi + '-' + this.seccion;
      this.urlCroquis = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://192.168.221.123/desarrollo/cpv2017/segm_esp/rural/${ubigeo}/${urlCroquisAux}.pdf`);
    }
    jQuery('#tablaCroAux tr').click(function () {
      jQuery('#tablaCroAux tr').each(function () {
        jQuery(this).removeClass('intro')
      })
      jQuery(this).addClass('intro');
    });
  }

  cambiarPdfAeu(seccion, aeu) {
    this.seccion = seccion;
    this.aeu = aeu;
    let ubigeo = this.ccdd + this.ccpp + this.ccdi;
    if (this.area == "0") {
      let urlCroquisAux = this.ccdd + this.ccpp + this.ccdi + this.zona + ('00' + this.seccion).slice(-3) + this.aeu;
      this.urlCroquis = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://192.168.221.123/desarrollo/cpv2017/segm_esp/urbano/${ubigeo}/${this.zona}/${urlCroquisAux}.pdf`);
    } else {
      let urlCroquisAux = this.ccdd + this.ccpp + this.ccdi + '-' + this.seccion + '-' + this.aeu;
      this.urlCroquis = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://192.168.221.123/desarrollo/cpv2017/segm_esp/rural/${ubigeo}/${urlCroquisAux}.pdf`);
    }
    jQuery('#tablaCroAux tr').click(function () {
      jQuery('#tablaCroAux tr').each(function () {
        jQuery(this).removeClass('intro')
      })
      jQuery(this).addClass('intro');
    });
  }

  descargarExcel(id, nom) {
    Helpers.descargarExcel(id, nom);
  }

  procesarCro() {
    this.urlProcesar = '';
    if (this.zona != '0') {
      this.urlProcesar = this.ccdd + '/' + this.ccpp + '/' + this.ccdi + '/' + this.area + '/' + this.zona + '/';
    } else {
      this.urlProcesar = this.ccdd + '/' + this.ccpp + '/' + this.ccdi + '/' + this.area + '/' + '/0/';
    }
    let toastOptions1: ToastOptions = {
      title: 'PROCESANDO',
      msg: this.urlProcesar,
      showClose: true,
      timeout: 5000,
    };
    this.addToast(toastOptions1, 'info');
  }

  addToast(options: ToastOptions, tipo: string = 'default') {
    let toastOptions: ToastOptions = options
    switch (tipo) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }

}

const routes: Routes = [{
  path: '',
  component: Croquisylistado
}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DataTableModule, SharedModule, ButtonModule, ToastyModule.forRoot()],
  declarations: [Croquisylistado]
})
export default class CroquisylistadoModule { }
