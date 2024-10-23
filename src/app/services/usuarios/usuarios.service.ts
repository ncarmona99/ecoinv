import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private lista_de_usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Nicolás',
      apellido: 'Carmona',
      rol: [{ id: 1, nombre: 'Administrador' }],
      correo: 'nicolascarmonarioseco@gmail.com',
      usuario: 'ncarmona',
      clave: 'nico123',
    },
    {
      id: 2,
      nombre: 'Javiera',
      apellido: 'Bustos',
      rol: [{ id: 2, nombre: 'Cliente' }],
      correo: 'javierabustosotarola@gmail.com',
      usuario: 'jbustos',
      clave: 'javi123',
    },
  ];

  private usuarioActual: Usuario | undefined;

  constructor() {}

  public obtener_lista_usuarios(): Usuario[] {
    return this.lista_de_usuarios;
  }

  public obtener_info_usuario(username: string): Usuario | undefined {
    console.log(username);
    return this.lista_de_usuarios.find(
      (usuario) => username == usuario.usuario
    );
  }

  public setUsuario(usuario: Usuario) {
    this.usuarioActual = usuario;
  }

  public getUsuarioActual(): Usuario | undefined {
    return this.usuarioActual;
  }
}
