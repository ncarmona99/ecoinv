import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutentificacionService } from '../services/autentificacion/autentificacion.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AutentificacionService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.estaAutenticado()) {
      return true;
    } else {
      // Redirige al usuario a la página de login si la sesión ha expirado
      this.router.navigate(['/login']);
      return false;
    }
  }
}