import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from '../../services/autentificacion/autentificacion.service';
import { ExpressionStatement } from '@angular/compiler';
import {  MenuController } from '@ionic/angular';
import {Usuario} from 'src/app/models/usuario';
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

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }
  
  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuCtrl.enable(true);
  }

  login(username: string, password: string) {
    const usuario: Usuario | undefined = this._usuarioService.obtener_info_usuario(this.username);
  
  if (this._authService.autentificacion(this.username, this.password) && usuario) {
    console.info('Usuario existe');
    this._usuarioService.setUsuario(usuario); // Almacena el usuario en el servicio
    this.router.navigate(['hub']); // Navegar al hub
  } else {
    console.error('Usuario No Existe o Contraseña Incorrecta');
  }}
}
