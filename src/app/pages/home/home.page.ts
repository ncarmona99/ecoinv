import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private _serviceProducto: ProductosService) {}
  productos: Producto[] = [];

  async ngOnInit() {
    this.obtenerProductos();
  }

  async obtenerProductos() {
    const response: HttpResponse<Producto[]> = await firstValueFrom(
      this._serviceProducto.obtener_productos()
    );
    console.log(response);
    this.productos = response.body || [];
  }
}
