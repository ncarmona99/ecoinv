import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {CreaSolicitud} from 'src/app/models/crea_solicitud';
import {SolicitanteService} from 'src/app/services/solicitante/solicitante.service';
import {Solicitante} from 'src/app/models/solicitante';
import { ModalController, LoadingController } from '@ionic/angular';
import { EditPage } from '../edit/edit.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  productos: Producto[] = [];
  valorSel: Producto | null = null;
  constructor(private loadingCtrl: LoadingController, private modalController: ModalController, private _serviceProducto: ProductosService, private _serviceSolicitante: SolicitanteService) {}

  nueva_solicitud: CreaSolicitud = {
    producto_idproducto: this.valorSel?.idproducto,
    solicitante_idsolicitante: 0,
    fechasolicitud: null,
    cantidad: 0,
  }

  solicitantes: Solicitante[] = [];

  async ngOnInit() {
    this.obtenerProductos();
    this.obtenerSolicitantes();

  }

  async obtenerProductos() {
    this.showLoading();
    const response: HttpResponse<Producto[]> = await firstValueFrom(
      this._serviceProducto.obtener_productos()
    );
    this.productos = response.body || [];
    console.log(response);
    this.loadingCtrl.dismiss();
  }

  async obtenerSolicitantes() {
    try {
      const response: HttpResponse<Solicitante[]> = await firstValueFrom(
        this._serviceSolicitante.obtener_solicitantes()
      );
      console.log('Respuesta de solicitantes:', response);
      this.solicitantes = response.body || [];
      console.log('Solicitantes:', this.solicitantes);
    } catch (error) {
      console.error('Error al obtener solicitantes:', error);
    }
  }

  onRadioChange(event: any) {
    this.valorSel = event.detail.value;
    console.log('Producto seleccionado:', this.valorSel);
    console.log('ID seleccionado:', this.valorSel?.idproducto);
  }
  async edit() {
    if (this.valorSel && this.valorSel.idproducto) {  // Asegurarse de que hay un producto seleccionado
      console.log('Producto seleccionado ID:', this.valorSel.idproducto); // Agregar esto
      const modal = await this.modalController.create({
        component: EditPage,
        componentProps: {
          productoId: this.valorSel.idproducto // Enviar solo el ID del producto seleccionado
        }
      });
      await modal.present();
    } else {
      console.log('No hay producto seleccionado o el producto no tiene ID.');
    }
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando productos'
    });

    loading.present();
  }
}
