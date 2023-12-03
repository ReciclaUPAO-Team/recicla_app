import { Component, OnInit } from '@angular/core';
import { ReActividadService } from 'src/app/service/re-actividad.service';

@Component({
  selector: 'app-v-historial',
  templateUrl: './v-historial.component.html',
  styleUrls: ['./v-historial.component.css']
})
export class VHistorialComponent implements OnInit {
  actividades: any[] = [];
  displayedColumns: string[] = ['nombre', 'cantidad', 'residuo', 'fecha'];
  usuarioId: number = 10; // Suponiendo que obtienes este ID de alguna manera

  constructor(private reActividadService: ReActividadService) { }

  ngOnInit(): void {
    this.reActividadService.obtenerHistorialPorUsuario(this.usuarioId).subscribe(
      (response) => {
        console.log('Datos recibidos:', response); // Agregar esto para depurar
        this.actividades = response;
      },
      (error) => {
        console.error('Error al obtener el historial de actividades', error);
      }
    );    
  }
}
