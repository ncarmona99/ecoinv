import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.page.html',
  styleUrls: ['./hub.page.scss'],
})
export class HubPage implements OnInit {
  usuario: Usuario | undefined;

  constructor(
    private router: Router,
    private _usuarioService: UsuariosService
  ) {}

  ngOnInit() {
    const username =
      this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
    console.log(username);
    this.usuario = this._usuarioService.obtener_info_usuario(username);
    console.log(this.usuario);
  }
}
