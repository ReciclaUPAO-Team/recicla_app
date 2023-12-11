import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { ReActividadService } from 'src/app/service/re-actividad.service';

@Component({
  selector: 'app-ver-estadistica',
  templateUrl: './ver-estadistica.component.html',
  styleUrls: ['./ver-estadistica.component.css']
})
export class VerEstadisticaComponent implements OnInit {
  public pieChartType: ChartType = 'pie';
  public pieChartDataActividades: ChartData<'pie', number[], string | string[]> = { labels: [], datasets: [{ data: [] }] };
  public pieChartDataPuntosActividad: ChartData<'pie', number[], string | string[]> = { labels: [], datasets: [{ data: [] }] };
  public pieChartDataPuntosUsuario: ChartData<'pie', number[], string | string[]> = { labels: [], datasets: [{ data: [] }] };

  constructor(private reActividadService: ReActividadService) { }

  ngOnInit(): void {
    this.obtenerEstadisticas();
  }

  obtenerEstadisticas(): void {
    this.reActividadService.obtenerEstadisticasUsuario().subscribe((estadisticas) => {
      this.pieChartDataActividades = {
        labels: ['Actividades Registradas', 'Resto'],
        datasets: [{ data: [estadisticas.totalActividades, 100 - estadisticas.totalActividades] }]
      };
      this.pieChartDataPuntosActividad = {
        labels: ['Puntos por Actividades', 'Resto'],
        datasets: [{ data: [estadisticas.totalPuntos, 500 - estadisticas.totalPuntos] }]
      };
      this.pieChartDataPuntosUsuario = {
        labels: ['Puntos del Usuario', 'Resto'],
        datasets: [{ data: [estadisticas.totalPuntosUsuario, 500 - estadisticas.totalPuntosUsuario] }]
      };
    });
  }
}
