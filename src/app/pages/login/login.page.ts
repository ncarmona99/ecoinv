import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from '../../services/autentificacion/autentificacion.service';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

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
    private router: Router,
    public menuCtrl: MenuController,
    private _usuarioService: UsuariosService
  ) {}

  ngOnInit() {
    const usuarioActivo = this._authService.obtenerUsuarioActivo();
    if (usuarioActivo) {
      this.router.navigate(['hub']); // Si ya hay un usuario autenticado, redirigir al hub
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  login() {
    const usuario: Usuario | undefined =
      this._usuarioService.obtener_info_usuario(this.username);

    if (
      this._authService.autentificacion(this.username, this.password) &&
      usuario
    ) {
      this._usuarioService.setUsuario(usuario);
      this.router.navigate(['hub']);
    } else {
      console.error('Usuario No Existe o Contraseña Incorrecta');
    }
  }
}
