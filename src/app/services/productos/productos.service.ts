import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ApiConfigService } from '../api-config/api-config.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  path = 'producto';
  constructor(private apiService: ApiConfigService) {}

  obtener_productos(): Observable<HttpResponse<Producto[]>> {
    const params = new HttpParams().set('select', '*');
    return this.apiService.get<Producto[]>(this.path, params).pipe(
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
