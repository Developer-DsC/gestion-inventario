import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bodega-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bodega-form.component.html',
  styleUrls: ['./bodega-form.component.css'],
})
export class BodegaFormComponent {
  @Output() guardar = new EventEmitter<any>();
  nombre = '';
  ciudad = '';

  agregarBodega() {
    this.guardar.emit({ nombre: this.nombre, ciudad: this.ciudad });
    this.nombre = '';
    this.ciudad = '';
  }
}
