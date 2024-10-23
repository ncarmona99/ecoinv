import { Solicitante } from './solicitante';
import { Producto } from './producto';

export interface CreaSolicitud {
  producto: Producto;
  solicitante: Solicitante;
  fecha: Date;
  cantidad: number;
}
