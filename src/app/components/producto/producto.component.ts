import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { ClimaService } from '../../services/clima.service';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductoFormComponent } from '../producto-form/producto-form.component';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-productos',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductoFormComponent,
  ],
})
export class ProductoComponent implements OnInit {
  productos: any[] = [];
  productosConClima: any[] = [];
  bodegas: any[] = [];
  productoEditando: any = null;

  ciudadFiltro = '';
  stockMinimo = 0;
  mostrarFormularioProducto = false;
  mostrarFormularioBodega = false;

  bodegaNueva = {
    nombre: '',
    ciudad: ''
  };

  constructor(
    private inventarioService: InventarioService,
    private climaService: ClimaService
  ) {}

  ngOnInit() {
    this.cargarProductos();
    this.cargarBodegas();
  }

  /* -------------------- Métodos para cargar datos -------------------- */

  cargarProductos() {
    this.inventarioService.getProductos().subscribe(data => {
      this.productos = data;
      this.agregarClimaAProductos();
    });
  }

  cargarBodegas() {
    this.inventarioService.getBodegas().subscribe(data => {
      this.bodegas = data;
    });
  }

  agregarClimaAProductos() {
    const observables = this.productos.map(producto =>
      this.climaService.obtenerClima(producto.ciudad).pipe(
        map(clima => ({ ...producto, climaActual: clima }))
      )
    );

    forkJoin(observables).subscribe(productosConClima => {
      this.productosConClima = productosConClima;
    });
  }

  /* -------------------- Métodos para filtros -------------------- */

  get productosFiltrados() {
    const ciudadFiltroLower = this.ciudadFiltro.toLowerCase();
    return this.productosConClima.filter(p =>
      (!this.ciudadFiltro || p.ciudad?.toLowerCase().includes(ciudadFiltroLower)) &&
      p.stock >= this.stockMinimo
    );
  }

  /* -------------------- Métodos para formulario producto -------------------- */

  abrirFormularioAgregar() {
    this.productoEditando = null;
    this.mostrarFormularioProducto = true;
    this.cargarBodegas();
  }

  nuevoProducto() {
    this.productoEditando = {
      nombre: '',
      stock: 0,
      precio: 0,
      id_bodega: null,
    };
    this.mostrarFormularioProducto = true;
    this.cargarBodegas();
  }

  editarProducto(producto: any) {
    this.productoEditando = producto;
    this.mostrarFormularioProducto = true;
    this.cargarBodegas();
  }

  manejarGuardar(datos: any) {
    console.log('Datos enviados:', datos);

    if (datos.id) {
      this.inventarioService.actualizarProducto(datos.id, datos).subscribe(() => {
        this._finalizarEdicionProducto();
      });
    } else {
      this.inventarioService.agregarProducto(datos).subscribe({
        next: () => this._finalizarEdicionProducto(),
        error: err => console.error('Error al agregar producto:', err)
      });
    }
  }

  cancelarEdicion() {
    this.mostrarFormularioProducto = false;
    this.productoEditando = null;
  }

  private _finalizarEdicionProducto() {
    this.productoEditando = null;
    this.mostrarFormularioProducto = false;
    this.cargarProductos();
  }

  /* -------------------- Métodos para formulario bodega -------------------- */

  crearBodega() {
    this.inventarioService.agregarBodega(this.bodegaNueva).subscribe(() => {
      this.mostrarFormularioBodega = false;
      this.bodegaNueva = { nombre: '', ciudad: '' };
      this.cargarBodegas();
      this.cargarProductos();
    });
  }

  /* -------------------- Métodos para eliminar -------------------- */

  eliminarProducto(id: number) {
    this.inventarioService.eliminarProducto(id).subscribe(() => {
      this.cargarProductos();
    });
  }
}
