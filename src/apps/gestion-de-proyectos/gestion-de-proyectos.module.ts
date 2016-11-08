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
  Router,
  Routes,
  RouterModule
} from '@angular/router';
import {
  FormsModule
} from '@angular/forms';
import { GestiondeProyectos } from './gestion-de-proyectos.component';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { MaterialModule } from '@angular/material';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/primeng';
import { TypeaheadModule } from 'ng2-bootstrap/components/typeahead';
const routes: Routes = [{
  path: '',
  component: GestiondeProyectos
}];

@NgModule({
  imports: [RouterModule.forChild(routes), 
  CommonModule, 
  ToastyModule.forRoot(), 
  FormsModule, MaterialModule, 
  DataTableModule, SharedModule,ConfirmDialogModule, TypeaheadModule],
  declarations: [GestiondeProyectos]
})
export default class GestiondeProyectosModule { }