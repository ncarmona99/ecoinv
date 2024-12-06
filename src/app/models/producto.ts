import { Categoria } from './categoria';

export interface Producto {
  idproducto: number;
  codproducto: string | null;
  empaque: string | null;
  descripcion: string;
  stock: number;
  categoria_idcategoria: Categoria;
  imagen?: string;
  imagenUrl?: string;
}
