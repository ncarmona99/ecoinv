import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud/solicitud.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {
  solicitudes: any[] = [];

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit() {
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes() {
    this.solicitudService.obtenerSolicitudes().subscribe({
      next: (response) => {
        this.solicitudes = response || []; // Asigna directamente la respuesta
      },
      error: (error) => {
        console.error('Error al obtener las solicitudes:', error);
      },
    });
  }
}