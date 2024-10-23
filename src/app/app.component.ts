import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Panel de control', url: '/hub', icon: 'briefcase-outline' },
    { title: 'Perfil', url: '/profile', icon: 'person-circle-outline' },
    { title: 'Cerrar sesión', url: '/login', icon: 'log-out-outline' },
  ];
  constructor() {}
}
