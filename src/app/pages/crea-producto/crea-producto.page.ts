import { Component } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
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
  isLoading = false;

  constructor(
    private productosService: ProductosService,
    private navCtrl: NavController,
    private cameraService: CameraService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async tomarFoto() {
    try {
      this.producto.imagen = await this.cameraService.takePicture();
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async crearProducto() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Agregando producto...',
    });
    await loading.present();

    try {
      await this.productosService.agregarProducto(this.producto);
      console.log('Producto agregado exitosamente');
      this.presentToast('Producto agregado exitosamente', 'success');
      this.navCtrl.navigateBack('/hub'); // Redirige a la lista de productos
    } catch (error) {
      console.error('Error al agregar producto:', error);
      this.presentToast('Error al agregar producto', 'danger');
    } finally {
      this.isLoading = false;
      loading.dismiss();
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}