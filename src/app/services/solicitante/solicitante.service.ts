import { Injectable } from '@angular/core';
import { Solicitante } from 'src/app/models/solicitante';
import { ApiConfigService } from '../api-config/api-config.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitanteService {
  path = 'solicitante';
  constructor(private apiService:ApiConfigService) { }
  obtener_solicitantes(): Observable<HttpResponse<Solicitante[]>> {
    const params = new HttpParams().set('select', '*');
    return this.apiService.get<Solicitante[]>(this.path, params).pipe(
      map((response) => {
        console.log(response);
        const filteredbody = response.body;

        // Retornar una nueva instancia de HttpResponse con el cuerpo filtrado
        return new HttpResponse({
          body: filteredbody,
          headers: response.headers, // Copia los headers originales
          status: response.status, // Copia el status original
          statusText: response.statusText, // Copia el statusText original
        });
      })
    );
  }
}
