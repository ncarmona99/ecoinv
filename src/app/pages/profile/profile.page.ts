import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { AutentificacionService } from 'src/app/services/autentificacion/autentificacion.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  usuario: Usuario | undefined;

  constructor(
    private router: Router,
    private _usuarioService: UsuariosService,
    private authService: AutentificacionService
  ) {}

  ngOnInit() {
    this.usuario = this._usuarioService.getUsuarioActual(); // Obtener usuario del servicio
    console.log(this.usuario);
  }

  logout() {
    this.authService.cerrarSesion();
  }
}
