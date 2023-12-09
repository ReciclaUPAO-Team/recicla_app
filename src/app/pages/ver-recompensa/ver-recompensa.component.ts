import { Component, OnInit } from '@angular/core';
import { Recompensa } from 'src/app/Modelo/recompensa';
import { RRecompensaService } from 'src/app/service/r-recompensa.service';

@Component({
  selector: 'app-ver-recompensa',
  templateUrl: './ver-recompensa.component.html',
  styleUrls: ['./ver-recompensa.component.css']
})
export class VerRecompensaComponent implements OnInit {
  recompensas: Recompensa[] = [];

  constructor(private recompensaService: RRecompensaService) {}

  ngOnInit(): void {
    this.recompensaService.listarRecompensas().subscribe(
      (recompensas) => {
        this.recompensas = recompensas;
      },
      (error) => {
        console.error('Error al obtener recompensas', error);
      }
    );
  }

  getImagenUrl(imagenPath: string): string {
    // Modifica esta línea para que coincida con la ruta de tu servidor donde se sirven las imágenes
    return `http://localhost:8080/recompensas/${imagenPath}`;
  }
  
}
