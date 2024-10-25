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

        return new HttpResponse({
          body: filteredbody,
          headers: response.headers, 
          status: response.status, 
          statusText: response.statusText, 
        });
      })
    );
  }

  actualizarDescripcionProducto(id: number, descripcion: string): Observable<HttpResponse<any>> {
    return this.apiService.patch(`${this.path}/${id}`, { descripcion });
  }

  modificarProductoDescripcion(idProducto: number, nuevaDescripcion: string): Observable<any> {
    const data = { descripcion: nuevaDescripcion };
    return this.apiService.patch(`producto?idproducto=eq.${idProducto}`, data); // Endpoint correcto con query param
}


  eliminarProducto(id: number): Observable<any> {
    const params = new HttpParams().set('idproducto', `eq.${id}`);
    return this.apiService.delete('producto', params);
  }
  agregarProducto(producto: { codproducto: string | null; descripcion: string; stock: number }): Observable<HttpResponse<any>> {
    return this.apiService.post(this.path, producto);
  }
}
