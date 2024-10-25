import { Component } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crea-producto',
  templateUrl: './crea-producto.page.html',
  styleUrls: ['./crea-producto.page.scss'],
})
export class CreaProductoPage {
  producto = {
    codproducto: null as string | null,
    descripcion: '',
    stock: 0
  };

  constructor(private productosService: ProductosService, private navCtrl: NavController) {}

  crearProducto() {
    this.productosService.agregarProducto(this.producto).subscribe({
      next: () => {
        console.log('Producto agregado exitosamente');
        this.navCtrl.navigateBack('/productos'); // Redirige a la lista de productos
      },
      error: (error) => {
        console.error('Error al agregar producto:', error);
      }
    });
  }
}
