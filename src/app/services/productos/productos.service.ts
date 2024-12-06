import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ApiConfigService } from '../api-config/api-config.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private supabaseUrl = 'https://xgdujjqhurmzfxelhysh.supabase.co';
  private supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnZHVqanFodXJtemZ4ZWxoeXNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTA0Mjc4MiwiZXhwIjoyMDQ0NjE4NzgyfQ.KYtZw9QcelyNh8TmOGNkBknpo0eH5UoZy2zXfbP7ZuU';
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);
  path = 'producto';

  constructor(private apiService: ApiConfigService) {}

  async subirImagen(base64Image: string, fileName: string): Promise<string> {
    if (!base64Image.includes(',')) {
      throw new Error('Formato de imagen base64 no válido');
    }

    const base64Data = base64Image.split(',')[1]; // Eliminar el encabezado de datos base64
    const contentType = base64Image.split(',')[0].split(':')[1].split(';')[0]; // Obtener el tipo de contenido

    // Convertir base64 a Blob
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });

    const { data, error } = await this.supabase.storage
      .from('productos')
      .upload(fileName, blob, {
        contentType: contentType,
        upsert: true,
      });

    if (error) {
      throw error;
    }

    return data.path;
  }

  async agregarProducto(producto: {
    codproducto: string | null;
    descripcion: string;
    stock: number;
    imagen: string;
  }): Promise<void> {
    if (producto.imagen) {
      const fileName = `productos/${producto.codproducto}.jpg`;
      producto.imagen = await this.subirImagen(producto.imagen, fileName);
    }

    const response = await this.apiService
      .post(this.path, producto)
      .toPromise();
    if (!response) {
      throw new Error('Error al agregar el producto');
    }
  }

  obtener_productos(
    page: number,
    limit: number
  ): Observable<HttpResponse<Producto[]>> {
    const params = new HttpParams()
      .set('select', '*')
      .set('offset', (page * limit).toString())
      .set('limit', limit.toString());

    return this.apiService.get<Producto[]>(this.path, params).pipe(
      map((response) => {
        const productos = response.body || [];
        productos.forEach((producto) => {
          if (producto.imagen) {
            const { data } = this.supabase.storage
              .from('productos')
              .getPublicUrl(producto.imagen);
            producto.imagenUrl = data.publicUrl;
          }
        });

        return new HttpResponse({
          body: productos,
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      })
    );
  }

  actualizarDescripcionProducto(
    id: number,
    descripcion: string
  ): Observable<HttpResponse<any>> {
    return this.apiService.patch(`${this.path}/${id}`, { descripcion });
  }

  modificarProductoDescripcion(
    idProducto: number,
    nuevaDescripcion: string
  ): Observable<any> {
    const data = { descripcion: nuevaDescripcion };
    return this.apiService.patch(`producto?idproducto=eq.${idProducto}`, data); // Endpoint correcto con query param
  }

  eliminarProducto(id: number): Observable<any> {
    const params = new HttpParams().set('idproducto', `eq.${id}`);
    return this.apiService.delete('producto', params);
  }
}
