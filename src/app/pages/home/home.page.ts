import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CreaSolicitud } from 'src/app/models/crea_solicitud';
import { SolicitanteService } from 'src/app/services/solicitante/solicitante.service';
import { Solicitante } from 'src/app/models/solicitante';
import {
  ModalController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { EditPage } from '../edit/edit.page';
import { ImageModalPage } from '../image-modal/image-modal.page'; // Importa el modal

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  productos: Producto[] = [];
  valorSel: Producto | null = null;
  solicitantes: Solicitante[] = [];
  nueva_solicitud: CreaSolicitud = {
    producto_idproducto: this.valorSel?.idproducto,
    solicitante_idsolicitante: 0,
    fechasolicitud: null,
    cantidad: 0,
  };

  currentPage = 0;
  itemsPerPage = 10;

  constructor(
    private loadingCtrl: LoadingController,
    private modalController: ModalController,
    private alertController: AlertController,
    private _serviceProducto: ProductosService,
    private _serviceSolicitante: SolicitanteService
  ) {}

  async ngOnInit() {
    await this.obtenerProductos();
    await this.obtenerSolicitantes();
  }

  async obtenerProductos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando productos',
    });
    await loading.present();

    try {
      const response = await firstValueFrom(
        this._serviceProducto.obtener_productos(
          this.currentPage,
          this.itemsPerPage
        )
      );
      this.productos = response.body || [];
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      loading.dismiss();
    }
  }

  async obtenerSolicitantes() {
    // Implementación para obtener solicitantes
  }

  onRadioChange(event: any) {
    // Implementación para manejar cambios en el radio button
  }

  async edit() {
    if (this.valorSel && this.valorSel.idproducto) {
      console.log('Producto seleccionado ID:', this.valorSel.idproducto);
      const modal = await this.modalController.create({
        component: EditPage,
        componentProps: {
          productoId: this.valorSel.idproducto, // Enviar solo el ID del producto seleccionado
        },
      });
      await modal.present();
    } else {
      console.log('No hay producto seleccionado o el producto no tiene ID.');
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando productos',
    });

    loading.present();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.obtenerProductos();
      event.target.complete();
    }, 2000);
  }

  nextPage() {
    this.currentPage++;
    this.obtenerProductos();
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.obtenerProductos();
    }
  }

  async mostrarImagen(producto: Producto) {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        imageUrl: producto.imagenUrl,
      },
    });

    await modal.present();
  }
}
