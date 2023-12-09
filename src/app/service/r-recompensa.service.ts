// src/app/service/r-recompensa.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserUrl from './helper';
import { Recompensa } from '../Modelo/recompensa';

@Injectable({
  providedIn: 'root'
})
export class RRecompensaService {
  constructor(private httpClient: HttpClient) { }

  public registrarRecompensa(formData: FormData): Observable<any> {
    return this.httpClient.post(`${baserUrl}/recompensa/crear`, formData);
  }
  public listarRecompensas(): Observable<Recompensa[]> {
    return this.httpClient.get<Recompensa[]>(`${baserUrl}/recompensa/catalogo`);
  }
}
