import {
  Component
} from '@angular/core';
import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { PresupuestoService } from './presupuesto_service';
declare var jQuery: any;


@Component({
  templateUrl: 'presupuesto.html',
  providers: [PresupuestoService]
})
class PresupuestoAnual {
    private actividad : Object;
    private partida : Object;
    private red : Object;
    private fuenteFto : Object;
    private mes : Object;
    private modalidad : Object;
    private cargoContratacion : Object;
    private cargoFuncional : Object;
    private presupuesto : Object;

    constructor(private presupuestoservice:PresupuestoService){
        this.presupuestoservice.getActividades().subscribe(res=>{
            this.actividad = res;
        });

        this.presupuestoservice.getPartida().subscribe(res=>{
            this.partida = res;
        });

        this.presupuestoservice.getCargoContratacion().subscribe(res=>{
            this.cargoContratacion=res;
        });

        this.presupuestoservice.getCargoFuncional().subscribe(res=>{
            this.cargoFuncional=res;
        });

        this.presupuestoservice.getFuenteFto().subscribe(res=>{
            this.fuenteFto=res;
        });

        this.presupuestoservice.getMes().subscribe(res=>{
            this.mes=res;
        });

        this.presupuestoservice.getModalidad().subscribe(res=>{
            this.modalidad=res;
        });

        this.presupuestoservice.getRed().subscribe(res=>{
            this.red=res;
        });

        this.presupuestoservice.getPresupuesto().subscribe(res=>{
            this.presupuesto=res;
        });
        
    }
    ngOnInit(){
        jQuery('#datatable-table_1').DataTable({
            "scrollX": true
        });
    }
}


const routes: Routes = [{
  path: '',
  component: PresupuestoAnual
}];
@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  declarations: [PresupuestoAnual]
})
export default class PresupuestoAnualModule {
    
}