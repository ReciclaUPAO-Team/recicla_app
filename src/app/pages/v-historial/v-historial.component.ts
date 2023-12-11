import { Component, OnInit } from '@angular/core';
import { ReActividadService } from 'src/app/service/re-actividad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-v-historial',
  templateUrl: './v-historial.component.html',
  styleUrls: ['./v-historial.component.css']
})
export class VHistorialComponent implements OnInit {
  actividades: any[] = [];
  displayedColumns: string[] = ['nombre', 'cantidad', 'residuo', 'fecha', 'compartir'];

  constructor(private reActividadService: ReActividadService) { }

  ngOnInit(): void {
    this.reActividadService.obtenerHistorialPorUsuario().subscribe(
      (response) => {
        this.actividades = response;
        console.log('Actividades recibidas:', this.actividades);
      },
      (error) => {
        console.error('Error al obtener el historial de actividades', error);
      }
    );
  }
  mostrarQR(idActividad: number): void {
    this.reActividadService.obtenerQR(idActividad).subscribe(
      qrCode => {
        const url = URL.createObjectURL(qrCode);
        Swal.fire({
          title: 'Código QR de la Actividad',
          imageUrl: url,
          imageAlt: 'Código QR',
        });
      },
      error => {
        console.error('Error al obtener el código QR', error);
        Swal.fire('Error', 'No se pudo cargar el código QR', 'error');
      }
    );
  }
}
