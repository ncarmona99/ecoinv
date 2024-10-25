import { Injectable } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { ApiConfigService } from '../api-config/api-config.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { CreaSolicitud } from 'src/app/models/crea_solicitud';


@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  path = 'solicitud';
  constructor(private apiService: ApiConfigService) {}

  agregarNuevaSolicitud(
    solicitud: CreaSolicitud
  ): Observable<HttpResponse<Solicitud>> {
    return this.apiService.post(this.path, solicitud);
  }

  obtenerSolicitudes(): Observable<Solicitud[]> {
    return this.apiService.get<Solicitud[]>('rpc/get_solicitudes').pipe(
      map((response: HttpResponse<Solicitud[]>) => response.body || [])
    );
  }
}
