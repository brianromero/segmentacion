import {
    Component
} from '@angular/core';
import {
    Helpers
} from './../../app/helper';
import {
    AccordionComponent
} from 'ng2-bootstrap/components/accordion';
import {
    GestionOpcionesService
} from './service';

import { OpcionesInterface } from './opciones.interface';

declare var jQuery: any;


@Component({
    templateUrl: 'gestion-de-opciones.html',
    providers: [AccordionComponent, GestionOpcionesService]
})

export class GestiondeOpciones {

    public oneAtATime: boolean = true;
    private opcionesModel = new OpcionesInterface();
    private list_opciones: Object;
    public status: Object = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
    constructor(private opcionesService: GestionOpcionesService) {
        this.getOpciones();
    }
    getOpciones() {
        this.opcionesService.getOpciones().subscribe(res => {
            this.list_opciones = res;
        })
    }

    addOpcion(){
        let data = this.opcionesModel;
        delete data.id_permiso;
        this.opcionesService.addOpcion(data).subscribe(res => {
            console.log(res);
            this.getOpciones();
        });
        jQuery('#modal_add_opcion').modal('hide');
    }

}