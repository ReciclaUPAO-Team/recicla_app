import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comunidad } from '../Modelo/comunidad';
import baserUrl from './helper'; // Asegúrate de que la ruta sea correcta

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
  public listarComunidades(): Observable<any> { 
    return this.httpClient.get<any>(`${baserUrl}/comunidad/mostrar`);
  }
  
  public unirseComunidad(idComunidad: number): Observable<any> {
    return this.httpClient.post(`${baserUrl}/comunidad/unirse/${idComunidad}`, null);
  }

  public actualizarComunidad(nombreComunidad: string, datos: { nombre: string, descripcion: string }): Observable<any> {
    const nombreCodificado = encodeURIComponent(nombreComunidad);
    return this.httpClient.put(`${baserUrl}/comunidad/actualizar/${nombreCodificado}`, datos);
  }


  eliminarComunidad(nombreComunidad: string): Observable<any> {
    const nombreCodificado = encodeURIComponent(nombreComunidad);
    return this.httpClient.delete(`${baserUrl}/comunidad/eliminar/${nombreCodificado}`, { responseType: 'text' });
  }
  
  
}
