import { Solicitante } from './solicitante';
import { Producto } from './producto';

export interface Solicitud {
  id: number;
  producto: Producto;
  solicitante: Solicitante;
  fecha: Date;
}
