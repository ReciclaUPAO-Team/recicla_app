import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comunidad } from '../Modelo/comunidad';
import baserUrl from './helper'; // Asegúrate de que la ruta sea correcta
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  constructor(private httpClient: HttpClient) {}

  //Completado
  public registrarComunidad(comunidad: Comunidad): Observable<any> {
    return this.httpClient.post(`${baserUrl}/comunidad/nuevo`, comunidad);
  }
  //Completado
 public listarComunidades(): Observable<Comunidad[]> { 
  return this.httpClient.get<any>(`${baserUrl}/comunidad/mostrar`).pipe(
    map(response => response.content) // Asumiendo que la respuesta tiene una propiedad content que es un array de Comunidad
  );
}

public unirseComunidad(idComunidad: number): Observable<any> {
  return this.httpClient.post(`${baserUrl}/comunidad/unirse/${idComunidad}`, null, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.obtenerToken()}`
    }),
    observe: 'response'
  });
}

private obtenerToken(): string {
  // Aquí obtienes el token JWT de donde lo tengas almacenado, por ejemplo localStorage
  return localStorage.getItem('token');
}



  public actualizarComunidad(nombreComunidad: string, datos: { nombre: string, descripcion: string }): Observable<any> {
    const nombreCodificado = encodeURIComponent(nombreComunidad);
    return this.httpClient.put(`${baserUrl}/comunidad/actualizar/${nombreCodificado}`, datos, { responseType: 'text' });
  }

  public eliminarComunidad(nombreComunidad: string): Observable<any> {
    const nombreCodificado = encodeURIComponent(nombreComunidad);
    return this.httpClient.delete(`${baserUrl}/comunidad/eliminar/${nombreCodificado}`, { responseType: 'text' });
  }
  
  
}
