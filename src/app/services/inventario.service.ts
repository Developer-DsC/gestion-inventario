import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiUrl = 'http://localhost:3000/api';
  private weatherApiKey = 'fd710483c61258a50720c1d921e41184'; // Reemplaza con tu API key real

  constructor(private http: HttpClient) {}

  // Productos
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos`);
  }

  agregarProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, producto);
  }

  actualizarProducto(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/productos/${id}`, data);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productos/borrar/${id}`);
  }

  // Bodegas
  getBodegas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bodegas`);
  }

  agregarBodega(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bodegas`, data);
  }

  // Clima
  getClima(ciudad: string): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${this.weatherApiKey}&units=metric`
    );
  }
}
