import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  FormsModule
} from '@angular/forms';
import { GestiondeSistemas } from './gestion-de-sistemas.component';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';
import { TypeaheadModule } from 'ng2-bootstrap/components/typeahead';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/primeng';
const routes: Routes = [{
  path: '',
  component: GestiondeSistemas
}];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule, MaterialModule.forRoot(), ToastyModule.forRoot(), ConfirmDialogModule],
  declarations: [GestiondeSistemas]
})
export default class GestiondeSistemasModule { }