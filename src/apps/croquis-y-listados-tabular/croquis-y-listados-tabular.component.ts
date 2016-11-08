import {
    Component
} from '@angular/core';
import {
    CroquisylistadostabularService
} from './croquis-y-listados-tabular.service';
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
    templateUrl: 'app/apps/croquis-y-listados-tabular/croquis-y-listados-tabular.component.html',
    providers: [CroquisylistadostabularService]
})
export class CroquisylistadostabularComponent {

    private departamento = new DepartamentoInterface();
    private provincia = new ProvinciaInterface();
    private distrito = new DistritoInterface();
    private area = new AreaInterface();
    private zona = new ZonaInterface();

    constructor(private croquisylistadostabularservice: CroquisylistadostabularService, private router: Router) {
        this.router.navigate(['croquisylistadostabular'])        
    }
}