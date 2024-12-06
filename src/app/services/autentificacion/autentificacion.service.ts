import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AutentificacionService {
  private sessionTimeout = 5 * 60 * 1000; // 5 minutos en milisegundos

  constructor(
    private _servicioUsuario: UsuariosService,
    private router: Router
  ) {}

  autentificacion(username: string, password: string): boolean {
    const usuarios = this._servicioUsuario.obtener_lista_usuarios();
    const usuarioExiste = usuarios.find(
      (usuario) => usuario.usuario == username && usuario.clave == password
    );

    if (usuarioExiste) {
      this.iniciarSesion(usuarioExiste);
      return true;
    } else {
      return false;
    }
  }

  iniciarSesion(usuario: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('ultimoActividad', Date.now().toString());
  }

  obtenerUsuarioActivo(): Usuario | null {
    const usuarioData = localStorage.getItem('usuario');
    const ultimoActividad = localStorage.getItem('ultimoActividad');

    if (usuarioData && ultimoActividad) {
      const tiempoActual = Date.now();
      const tiempoInactivo = tiempoActual - parseInt(ultimoActividad);

      if (tiempoInactivo < this.sessionTimeout) {
        localStorage.setItem('ultimoActividad', tiempoActual.toString());
        return JSON.parse(usuarioData);
      } else {
        this.cerrarSesion();
      }
    }

    return null;
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('ultimoActividad');
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }

  estaAutenticado(): boolean {
    return this.obtenerUsuarioActivo() !== null;
  }
}
