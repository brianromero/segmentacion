import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import {
  LoginService
} from './login.service';
import {
  Router
} from '@angular/router';
import {
  LoginInterface
} from './login.interface';

import { Helpers } from './../helper';

@Component({
  selector: 'login',
  styleUrls: ['./login.style.scss'],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  },
  providers: [LoginService]
})
export class Login {

  private errorLogin: boolean = false;
  private validLogin: boolean;
  private login = new LoginInterface();

  constructor(private loginservice: LoginService, private router: Router) {
    this.validLogin = Helpers.isValidSession();
    if (this.validLogin) {
      setTimeout(() => {
        this.router.navigate(['app']);
      }, 1000)
    }
  }

  doLogin() {
    let url = `?username=${this.login.username}&clave=${this.login.clave}`;
    this.loginservice.authenticate(url).subscribe(res => {
      if (Object.keys(res).length === 0) {
        this.errorLogin = true;
      } else {
        this.errorLogin = false;
        setTimeout(() => {
          this.router.navigate(['app']);
        }, 1000)

        localStorage.setItem('usuario', JSON.stringify(res));
      }
    });
  }
}