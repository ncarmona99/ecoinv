import { Solicitante } from './solicitante';
import { Producto } from './producto';

export interface Solicitud {
  idsolicitud: number;
  producto_idproducto: Producto;
  solicitante_idsolicitante: Solicitante;
  fechasolicitud: Date;
  cantidad: number;
}
