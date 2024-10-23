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

  obtener_solicitud(): Observable<HttpResponse<Solicitud[]>> {
    const params = new HttpParams().set('select', 'id');
    return this.apiService.get<Solicitud[]>(this.path, params).pipe(
      map((response) => {
        console.log(response);
        const filteredBody = response.body?.filter((product) => product);

        // Retornar una nueva instancia de HttpResponse con el cuerpo filtrado
        return new HttpResponse({
          body: filteredBody, // El nuevo array filtrado
          headers: response.headers, // Copia los headers originales
          status: response.status, // Copia el status original
          statusText: response.statusText, // Copia el statusText original
        });
      })
    );
  }

  agregarNuevaSolicitud(
    solicitud: CreaSolicitud
  ): Observable<HttpResponse<Solicitud>> {
    return this.apiService.post(this.path, solicitud);
  }
}
