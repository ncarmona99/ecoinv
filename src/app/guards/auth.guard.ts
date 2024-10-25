import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutentificacionService } from '../services/autentificacion/autentificacion.service';
import { UsuariosService } from '../services/usuarios/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AutentificacionService,
    private usuarioService: UsuariosService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const usuario = this.usuarioService.getUsuarioActual();

    if (usuario) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
