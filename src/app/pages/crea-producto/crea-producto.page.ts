import { Component } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { NavController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera/camera.service';

@Component({
  selector: 'app-crea-producto',
  templateUrl: './crea-producto.page.html',
  styleUrls: ['./crea-producto.page.scss'],
})
export class CreaProductoPage {
  producto = {
    codproducto: null as string | null,
    descripcion: '',
    stock: 0,
    imagen: '',
  };

  constructor(
    private productosService: ProductosService,
    private navCtrl: NavController,
    private cameraService: CameraService
  ) {}

  async tomarFoto() {
    try {
      this.producto.imagen = await this.cameraService.takePicture();
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async crearProducto() {
    try {
      await this.productosService.agregarProducto(this.producto);
      console.log('Producto agregado exitosamente');
      this.navCtrl.navigateBack('/productos'); // Redirige a la lista de productos
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  }
}
