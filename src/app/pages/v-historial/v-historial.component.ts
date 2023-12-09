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

  constructor(private reActividadService: ReActividadService) { }

  ngOnInit(): void {
    this.reActividadService.obtenerHistorialPorUsuario().subscribe(
      (response) => {
        this.actividades = response;
      },
      (error) => {
        console.error('Error al obtener el historial de actividades', error);
      }
    );    
}
}
