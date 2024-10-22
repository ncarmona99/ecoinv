import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from '../../services/autentificacion/autentificacion.service';
import { ExpressionStatement } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private _authService: AutentificacionService,
    private router: Router
  ) {}

  ngOnInit() {}

  login(username: string, password: string) {
    if (this._authService.autentificacion(username, password)) {
      console.info('Usuario existe');
      this.router.navigate(['hub'], {
        state: {
          usuario: username,
        },
      });
    } else {
      console.error('Usuario No Existe');
    }
  }
}
