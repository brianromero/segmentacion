import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { TableOptions, TableColumn, ColumnMode } from 'angular2-data-table';
import { IProyectosSiga } from './proyectos_siga.interface';
import { IProyectoSeguridad, ProyectoSeguridad } from './proyectos_seguridad.interface';
import { Helpers } from './../../app/helper';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GestionProyectosService } from './proyectos.service';
import { SistemasService } from './../gestion-de-sistemas/sistemas.service';
import { NgForm } from '@angular/forms';
import 'rxjs/add/observable/of';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/primeng';
import { ISistemas } from './../gestion-de-sistemas/sistemas.interface'
declare var jQuery: any;
@Component({
    templateUrl: 'gestion-de-proyectos.html',
    providers: [GestionProyectosService, SistemasService, ConfirmationService],
})
export class GestiondeProyectos implements OnInit {
    private seguridad: IProyectoSeguridad;
    private selectedSeguridad: IProyectoSeguridad;
    private siga: IProyectosSiga;
    private sigaSelected: IProyectosSiga;
    private customSelected: string = '';
    private update: boolean = false;
    private insert: boolean = false;
    private asignar: boolean = false;
    private flag_activo: boolean;
    private newproyecto = new ProyectoSeguridad();
    private titulo_modal: string;
    private sistemas_por_asignar: any;
    private sistemas_por_asignar_selected: any;
    private sistemas: ISistemas;
    private asignarsistema: boolean;
    private sistemasSelected: any;
    constructor(
        private proyectosservice: GestionProyectosService,
        private sistemasservice: SistemasService,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private confirmationService: ConfirmationService) {
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = "bottom-right";

    }
    ngOnInit() {
        this.getProyectos()
        this.getProyectosSiga()
    }

    getProyectos() {
        this.proyectosservice.get().subscribe(seguridad => {
            this.seguridad = <IProyectoSeguridad>seguridad
        })
    }

    getProyectosSiga() {
        this.proyectosservice.getSiga().subscribe(siga => {
            this.siga = <IProyectosSiga>siga
            console.log(this.siga);
        })
    }

    public typeaheadOnSelect(event): void {
        this.sigaSelected = event.item;
        console.log(this.sigaSelected);
    }

    editProyectoModal() {
        this.titulo_modal = 'Editar y/o Borrar Proyecto';
        this.update = true;
        this.insert = false;
        this.asignar = false;
        jQuery('#add_edit').modal('show');
    }

    editProyecto(form: NgForm) {
        console.log(form.value)
        let data: any = Helpers.booleanToNumber(form.value);
        let toastOptions: ToastOptions = {
            title: 'Edición',
            msg: 'Editado con exito!',
            showClose: true,
            timeout: 5000,
        };
        this.confirmationService.confirm({
            message: 'Esta usted seguro de editar este Proyecto?',
            accept: () => {
                this.addToast(toastOptions, 'success');
                this.proyectosservice.edit(this.selectedSeguridad.id_proyecto, data).subscribe(_ => {
                    this.getProyectos();
                })
                form.resetForm();
                jQuery('#add_edit').modal('hide');
            }
        });
    }

    deleteProyecto() {
        let toastOptions: ToastOptions = {
            title: 'Borrar',
            msg: 'Eliminado con exito!',
            showClose: true,
            timeout: 5000,
        };
        this.confirmationService.confirm({
            message: 'Esta usted seguro de eliminar este Proyecto?',
            accept: () => {
                this.addToast(toastOptions, 'success');
                this.proyectosservice.delete(this.selectedSeguridad.id_proyecto).subscribe(_ => {
                    this.getProyectos();
                })
                jQuery('#add_edit').modal('hide');
            }
        });
    }

    addProyectoModal() {
        this.titulo_modal = 'Agregar Proyecto';
        this.update = false;
        this.insert = true;
        this.asignar = false;
        this.newproyecto.anio_proy = this.sigaSelected.annio_meta
        this.newproyecto.des_proy = this.sigaSelected.objetivo
        this.newproyecto.cod_meta = this.sigaSelected.codi_Meta
        jQuery('#add_edit').modal('show');
    }

    addProyecto(form: NgForm) {
        console.log(form.value)
        let data: any = Helpers.booleanToNumber(form.value);
        let toastOptions: ToastOptions = {
            title: 'Added!',
            msg: 'Agregado con exito!',
            showClose: true,
            timeout: 5000,
        };
        this.confirmationService.confirm({
            message: 'Esta usted seguro de agregar este Proyecto?',
            accept: () => {
                this.addToast(toastOptions, 'success');
                this.proyectosservice.add(data).subscribe(_ => {
                    this.getProyectos();
                    this.getProyectosSiga();
                    this.sigaSelected = null;
                })
                form.resetForm();
                jQuery('#add_edit').modal('hide');
            }
        });
    }

    asignarProyectoModal() {
        this.titulo_modal = 'Asignar Sistemas a Proyecto';
        this.update = false;
        this.insert = false;
        this.asignar = true;
        this.sistemasservice.get().subscribe(sistemas => {
            this.sistemas = <ISistemas>sistemas;
            this.sistemas_por_asignar = Helpers.diffObjects(this.selectedSeguridad.sistemas, this.sistemas);
            console.log(this.sistemas_por_asignar);
        })
        jQuery('#add_edit').modal('show');
    }

    asignarProyectos() {
        console.log(this.sistemas_por_asignar_selected);
        let toastOptions2: ToastOptions = {
            title: 'Error',
            msg: 'Seleccione 1 o mas Sistemas por Asignar',
            showClose: true,
            timeout: 5000,
        };
        if (Helpers.lengthobj(this.sistemas_por_asignar_selected) > 0) {
            let toastOptions: ToastOptions = {
                title: 'Asignacion',
                msg: 'Sistemas Asignados con exito!',
                showClose: true,
                timeout: 5000,
            };
            this.confirmationService.confirm({
                message: 'Esta usted seguro asignar estos Sistemas?',
                accept: () => {
                    this.addToast(toastOptions, 'success');
                    for (let key in this.sistemas_por_asignar_selected) {
                        let data: any = {
                            id_proyecto: this.selectedSeguridad.id_proyecto,
                            id_sistema: this.sistemas_por_asignar_selected[key].id_sistema,
                            titulo_sistema_padre: this.sistemas_por_asignar_selected[key].nom_sist
                        }
                        this.proyectosservice.add_sistemas(data).subscribe(_ => {
                            this.getProyectos();
                            jQuery('#add_edit').modal('hide');
                        })
                    }
                }
            });
        } else {
            this.addToast(toastOptions2, 'error');
        }
    }

    eliminarSistemas() {
        this.confirmationService.confirm({
            message: 'Esta usted seguro de eliminar estos Sistemas?',
            accept: () => {
                for (let key in this.sistemasSelected) {
                    this.proyectosservice.deleteSistemas(this.selectedSeguridad.id_proyecto, this.sistemasSelected[key].id_sistema)
                        .subscribe(() => {
                            this.getProyectos();
                            jQuery('#add_edit').modal('hide');
                        })
                }

            }
        })
    }

    onRowUnselect(e) {
        console.log(this.selectedSeguridad);
    }

    onRowSelect(e) {
        console.log(this.selectedSeguridad);
        this.flag_activo = this.selectedSeguridad.flag_activo == "1" ? true : false;
    }

    addToast(options: ToastOptions, tipo: string = 'default') {
        // Just add default Toast with title only
        // Or create the instance of ToastOptions
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