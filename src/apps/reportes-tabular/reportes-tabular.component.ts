import {
    Component
} from '@angular/core';
import {
    ReportestabularService
} from './reportes-tabular.service';
import {
    Router
} from '@angular/router';
import {
    DepartamentoInterface
} from './departamento.interface'
import {
    ProvinciaInterface
} 
from './provincia.interface'
import {
    DistritoInterface
} 
from './distrito.interface'
import {
    AreaInterface
} from './area.interface'
import {
    ZonaInterface
} from './zona.interface'

@Component({
    selector: 'my-app',
    templateUrl: 'app/apps/reportes-tabular/reportes-tabular.component.html',
    providers: [ReportestabularService]
})
export class ReportestabularService {

    private departamento = new DepartamentoInterface();
    private provincia = new ProvinciaInterface();
    private distrito = new DistritoInterface();
    private area = new AreaInterface();
    private zona = new ZonaInterface();

    constructor(private reportestabularservice: ReportestabularService, private router: Router) {
        this.router.navigate(['reportestabular']);
    }
}