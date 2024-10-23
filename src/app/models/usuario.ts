import { Rol } from './rol';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  rol: Rol[];
  correo: string;
  usuario: string;
  clave: string;
}
