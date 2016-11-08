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
import { GestiondeOpciones } from './gestion-de-opciones.component';
import { AccordionModule } from 'ng2-bootstrap/components/accordion';
declare var jQuery: any;

const routes: Routes = [{
  path: '',
  component: GestiondeOpciones
}];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule,AccordionModule],
  declarations: [GestiondeOpciones]
})
export default class GestiondeOpcionesModule {}