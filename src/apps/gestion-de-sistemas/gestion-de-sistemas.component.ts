import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { SistemasService } from './sistemas.service';
import { ISistemas,Sistema } from './sistemas.interface';
import { Helpers } from './../../app/helper';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
declare var jQuery: any;
@Component({
    templateUrl: 'gestion-de-sistemas.html',
    providers: [SistemasService, ConfirmationService]
})
export class GestiondeSistemas implements OnInit {

    private sistemas: ISistemas;
    private selectedSistema: ISistemas;
    private sistemasended = new Sistema(); 
    private flag_activo: boolean;
    private titulo_modal: string = 'Agregar Sistema';
    private update: boolean = false;
    private insert: boolean = false;
    private validform: boolean = false;
    constructor(
        private sistemasservice: SistemasService,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private confirmationService: ConfirmationService) {
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = "bottom-right";
    }

    ngOnInit() {
        this.getSistemas();
    }

    getSistemas() {
        this.sistemasservice.get().subscribe(sistemas => {
            this.sistemas = <ISistemas>sistemas;
            console.log(this.sistemas);
        })
    }

    onSelect(sistema: ISistemas) {
        this.update = true;
        this.insert = false;
        this.titulo_modal = 'Editar y/o Borrar Sistema';
        this.selectedSistema = sistema;
        console.log(this.selectedSistema);
        this.flag_activo = this.selectedSistema.flag_activo == "1" ? true : false;
        console.log(this.flag_activo);
        jQuery('#add_edit').modal('show');
    }

    showAddModal() {
        this.insert = true;
        this.update = false;
        this.titulo_modal = 'Agregar Sistema';
        jQuery('#add_edit').modal('show');
    }

    addSistema(sistemas) {
        this.selectedSistema = undefined;
        this.titulo_modal = 'Agregar Sistema';
        this.sistemasservice.add(sistemas).subscribe(_ => {
            this.getSistemas();
        });
    }

    editSistema(f:NgForm) {
        let editdata = Helpers.booleanToNumber(f.value);
        this.confirmationService.confirm({
            message: 'Esta usted seguro de editar este Sistema?',
            accept: () => {
                this.sistemasservice.edit(this.selectedSistema.id_sistema, editdata).subscribe(_ => {
                    this.sistemasservice.get(this.selectedSistema.id_sistema).subscribe(res => {
                        let toastOptions: ToastOptions = {
                            title: 'Edicion completada',
                            msg: `editado con exito!`,
                            showClose: true,
                            timeout: 5000,
                        };
                        this.addToast(toastOptions, 'success');
                        this.getSistemas();
                    })
                })
                jQuery('#add_edit').modal('hide');
            }
        });
    }

    deleteSistema() {
        console.log(this.selectedSistema);
        let toastOptions: ToastOptions = {
            title: 'Borrado con exito!',
            msg: `${this.selectedSistema.nom_sist} borrado con exito!`,
            showClose: true,
            timeout: 5000,
        };
        this.confirmationService.confirm({
            message: 'Esta usted seguro de agregar este Sistema?',
            accept: () => {
                this.sistemasservice.delete(this.selectedSistema.id_sistema).subscribe(() => {
                    this.getSistemas();
                    this.addToast(toastOptions, 'success');
                })

                jQuery('#add_edit').modal('hide');
            }
        });
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

    onSubmit(f: NgForm) {
        let data: any = Helpers.booleanToNumber(f.value);
        let title = '';
        let msg = '';
        let tipo = '';
        this.validform = f.valid;
        title = 'Added!';
        msg = 'Sistema agregado con exito!';
        tipo = 'success';
        let toastOptions: ToastOptions = {
            title: title,
            msg: msg,
            showClose: true,
            timeout: 5000,
        };

        if (this.validform) {
            this.confirmationService.confirm({
                message: 'Esta usted seguro de agregar este Sistema?',
                accept: () => {
                    this.addToast(toastOptions, tipo);
                    this.addSistema(data);
                    f.resetForm();
                    jQuery('#add_edit').modal('hide');
                }
            });
        }
    }
}