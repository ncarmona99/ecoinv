import { Injectable } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class AutentificacionService {
  constructor(private _servicioUsuario: UsuariosService) {}

  autentificacion(username: string, password: string): boolean {
    const usuarios = this._servicioUsuario.obtener_lista_usuarios();
    const usuarioExiste = usuarios.some(
      (usuario) => usuario.usuario == username && usuario.clave == password
    );
    if (usuarioExiste) {
      return true;
    } else {
      return false;
    }
  }
}
