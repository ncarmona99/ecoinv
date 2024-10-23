import { Categoria } from './categoria';

export interface Producto {
  id: number;
  cod: string | null;
  empaque: string | null;
  descripcion: string;
  stock: number;
  id_categoria: Categoria;
}
