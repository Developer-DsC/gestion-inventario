import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClimaService {
  private apiKey = 'fd710483c61258a50720c1d921e41184'; // Reemplaza con tu API Key real
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  obtenerClima(ciudad: string): Observable<string> {
    if (!ciudad) return of('Sin ciudad');

    const url = `${this.baseUrl}?q=${ciudad}&appid=${this.apiKey}&units=metric&lang=es`;

    return this.http.get<any>(url).pipe(
      map(data => `${data.weather[0].description}, ${data.main.temp}°C`),
      catchError(() => of('No disponible'))
    );
  }
}
