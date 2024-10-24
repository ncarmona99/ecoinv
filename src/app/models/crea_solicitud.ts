export interface CreaSolicitud {
  producto_idproducto: number | undefined;
  solicitante_idsolicitante: number;
  fechasolicitud: Date | null;
  cantidad: number;
}
