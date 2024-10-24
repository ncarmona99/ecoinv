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
  
    // Primero, actualiza el stock del producto
    try {
      // Actualizamos el stock del producto usando 'idproducto'
      await this.apiConfigService.patch<any>(`producto?idproducto=eq.${this.productoId}`, {
        idproducto: this.productoId, // ID del producto
        cantidad: this.cantidad // Cantidad que se va a descontar
      });
      console.log('Stock actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
      return; // Si falla la actualización, no continúes con la solicitud
    }
    this.actualizarStockProducto(this.productoId, this.cantidad);
    // Luego, crea la nueva solicitud
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
      console.error('Error al guardar la solicitud:', error);
    }
  }
  
  close() {
    this.modalControl.dismiss();
  }
  
  async actualizarStockProducto(productoId: number, cantidadSolicitada: number): Promise<void> {
    try {
      // Obtener el producto actual con el stock usando 'idproducto'
      const productoResponse = await firstValueFrom(
        this.apiConfigService.get<any>(`producto?idproducto=eq.${productoId}`)
      );
  
      const producto = productoResponse.body[0]; // Acceder al primer objeto si se devuelve una lista
  
      if (!producto) {
        console.error('Producto no encontrado');
        return;
      }
  
      const stockActual = producto.stock;
  
      // Calcular el nuevo stock
      const nuevoStock = stockActual - cantidadSolicitada;
  
      // Verificar que el stock no sea negativo
      if (nuevoStock < 0) {
        console.error('Error: El stock no puede ser negativo');
        return;
      }
  
      // Actualizar el stock en la base de datos usando 'idproducto'
      console.log('Actualizando stock para el producto:', productoId);
      console.log('Stock actual:', stockActual);
      console.log('Cantidad solicitada:', cantidadSolicitada);
      console.log('Nuevo stock:', nuevoStock);
  
      const updateResponse = await firstValueFrom(
        this.apiConfigService.patch<any>(`producto?idproducto=eq.${productoId}`, { stock: nuevoStock }) // Usa PATCH para actualizar el stock
      );
  
      console.log('Respuesta de la actualización:', updateResponse.body);
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
    }
  }
  
}