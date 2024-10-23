import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {CreaSolicitud} from 'src/app/models/crea_solicitud';
import {SolicitanteService} from 'src/app/services/solicitante/solicitante.service';
import {Solicitante} from 'src/app/models/solicitante';
import { ModalController } from '@ionic/angular';
import { EditPage } from '../edit/edit.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  productos: Producto[] = [];
  valorSel: Producto | null = null;
  constructor(private modalController: ModalController, private _serviceProducto: ProductosService, private _serviceSolicitante: SolicitanteService) {}

  nueva_solicitud: CreaSolicitud = {
    producto: this.valorSel?.idproducto,
    solicitante: 0,
    fecha: null,
    cantidad: 0,
  }

  solicitantes: Solicitante[] = [];

  async ngOnInit() {
    this.obtenerProductos();
    this.obtenerSolicitantes();

  }

  async obtenerProductos() {
    const response: HttpResponse<Producto[]> = await firstValueFrom(
      this._serviceProducto.obtener_productos()
    );
    this.productos = response.body || [];
    console.log(response);
  }

  async obtenerSolicitantes() {
    try {
      const response: HttpResponse<Solicitante[]> = await firstValueFrom(
        this._serviceSolicitante.obtener_solicitantes()
      );
      console.log('Respuesta de solicitantes:', response); // Agrega esto
      this.solicitantes = response.body || [];
      console.log('Solicitantes:', this.solicitantes); // Agrega esto para ver el contenido
    } catch (error) {
      console.error('Error al obtener solicitantes:', error);
    }
  }

  onRadioChange(event: any) {
    this.valorSel = event.detail.value; // Guardar el objeto completo
    console.log('Producto seleccionado:', this.valorSel);
    console.log('ID seleccionado:', this.valorSel?.idproducto); // Acceder al id del producto seleccionado
  }
  getIdProducto(){
    return this.valorSel?.idproducto;
  }
  edit(){
    this.modalController.create({
      component: EditPage
    }).then(modalres =>{
      modalres.present();
    })
  }
}
