import { Component, EventEmitter, Input, Output, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit, OnChanges {

  @Input() producto: any = null; // Producto a editar
  @Input() bodegas: any[] = [];

  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      bodega_id: [null, Validators.required] // Campo bodega
    });
  }

  ngOnInit(): void {
    console.log('Bodegas recibidas en ProductoForm:', this.bodegas);
  }

  ngOnChanges(): void {
    if (this.producto) {
      this.formulario.patchValue(this.producto);
    } else {
      this.formulario.reset({
        nombre: '',
        stock: 0,
        precio: 0,
        bodega_id: null
      });
    }
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const datos = {
        ...this.producto,
        ...this.formulario.value
      };
      this.guardar.emit(datos);
      this.formulario.reset();
    }
  }

  onCancel(): void {
    this.formulario.reset();
    this.cancelar.emit();
  }
}
