import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-mod-producto',
  templateUrl: './mod-producto.page.html',
  styleUrls: ['./mod-producto.page.scss'],
})
export class ModProductoPage implements OnInit {

  productos: any[] = [];
  editando: number | null = null;  // Guarda el ID del producto en edición
  descripcionActualizada: string = ''; // Almacena la descripción actualizada

  constructor(private productoService: ProductosService) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.obtener_productos().subscribe({
      next: (response:any) => {
        this.productos = response.body || [];
      },
      error: (error:any) => {
        console.error('Error al obtener productos:', error);
      },
    });
  }

  // Activar edición
  activarEdicion(id: number, descripcion: string) {
    this.editando = id;
    this.descripcionActualizada = descripcion;
  }

  actualizarDescripcionProducto(idProducto: number, nuevaDescripcion: string) {
    this.productoService.modificarProductoDescripcion(idProducto, nuevaDescripcion).subscribe({
      next: () => {
        console.log('Descripción actualizada exitosamente');
        this.obtenerProductos();  // Actualiza el listado después de la modificación
      },
      error: (error) => {
        console.error('Error al actualizar la descripción:', error);
      },
    });
  }
  actualizarDescripcion() {
    // Solo procede si el producto en edición no es nulo
    if (this.editando !== null) {
        this.productoService.modificarProductoDescripcion(this.editando, this.descripcionActualizada).subscribe({
            next: () => {
                console.log('Descripción actualizada exitosamente');
                this.obtenerProductos(); // Vuelve a cargar la lista después de actualizar
                this.editando = null; // Finaliza el modo de edición
                this.descripcionActualizada = ''; // Limpia la descripción después de guardar
            },
            error: (error: any) => {
                console.error('Error al actualizar la descripción:', error);
            },
        });
    }
}

  // Eliminar producto
  eliminarProducto(id: number) {
    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        this.obtenerProductos();
      },
      error: (error:any) => {
        console.error('Error al eliminar producto:', error);
      },
    });
  }
}