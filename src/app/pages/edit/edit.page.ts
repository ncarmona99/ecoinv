import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CreaSolicitud } from 'src/app/models/crea_solicitud';
import { SolicitanteService } from 'src/app/services/solicitante/solicitante.service';
import { Solicitante } from 'src/app/models/solicitante';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ApiConfigService } from 'src/app/services/api-config/api-config.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  solicitantes: Solicitante[] = [];
  cantidad: number = 0;
  solicitanteSeleccionado: number | null = null;
  productoId: number;
  
  constructor(
    private modalControl: ModalController,
    private navParams: NavParams,
    private _serviceSolicitante: SolicitanteService,
    private apiConfigService: ApiConfigService
  ) {
    this.productoId = this.navParams.get('productoId'); // Obtiene el ID del producto seleccionado
    console.log('Producto ID en edit page:', this.productoId); // Agrega esto para depuración
  }

  async ngOnInit() {
    this.obtenerSolicitantes();
  }

  async obtenerSolicitantes() {
    try {
      const response: HttpResponse<Solicitante[]> = await firstValueFrom(
        this._serviceSolicitante.obtener_solicitantes()
      );
      this.solicitantes = response.body || [];
    } catch (error) {
      console.error('Error al obtener solicitantes:', error);
    }
  }

  async enviarSolicitud() {
    if (!this.solicitanteSeleccionado || !this.cantidad) {
      console.error('Debe seleccionar un solicitante y una cantidad');
      return;
    }

    const nuevaSolicitud: CreaSolicitud = {
      producto_idproducto: this.productoId,
      solicitante_idsolicitante: this.solicitanteSeleccionado,
      cantidad: this.cantidad,
      fechasolicitud: new Date(),
    };

    try {
      const response = await firstValueFrom(
        this.apiConfigService.post<any>('solicitud', nuevaSolicitud) // Ajusta el endpoint
      );
      console.log('Solicitud guardada:', response.body);
      this.modalControl.dismiss(); // Cierra el modal si todo sale bien
    } catch (error) {
      console.error('ESto es lo que se recibe: ', this.productoId,'Error al guardar la solicitud:', error);
    }
  }

  close() {
    this.modalControl.dismiss();
  }
}