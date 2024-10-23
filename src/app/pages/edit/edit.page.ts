import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CreaSolicitud } from 'src/app/models/crea_solicitud';
import { SolicitanteService } from 'src/app/services/solicitante/solicitante.service';
import { Solicitante } from 'src/app/models/solicitante';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  constructor(
    private modalControl: ModalController,
    private navParams: NavParams,
    private _serviceSolicitante: SolicitanteService
  ) {}
  solicitantes: Solicitante[] = [];
  async ngOnInit() {
    this.obtenerSolicitantes();
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

  close() {
    this.modalControl.dismiss();
  }
}
