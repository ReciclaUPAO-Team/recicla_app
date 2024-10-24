import { Component, OnInit } from '@angular/core';
import { ReActividadService } from 'src/app/service/re-actividad.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-v-historial',
  templateUrl: './v-historial.component.html',
  styleUrls: ['./v-historial.component.css']
})
export class VHistorialComponent implements OnInit {
  actividades = new MatTableDataSource<any>([]);  // Usamos MatTableDataSource para las actividades
  displayedColumns: string[] = ['nombre', 'cantidad', 'residuo', 'puntosGanados', 'fecha', 'imagen', 'compartir'];

  filtroNombre: string = '';  // Valor del filtro para el nombre de la actividad
  filtroResiduo: string = '';  // Valor del filtro para el tipo de residuo
  ordenCantidad: string = '';  // Valor del filtro para la cantidad (mayor a menor o menor a mayor)
  residuosDisponibles: string[] = [];  // Lista de tipos de residuos registrados por el usuario
  actividadesOriginal: any[] = [];  // Para guardar el estado original de las actividades

  constructor(private reActividadService: ReActividadService) { }

  ngOnInit(): void {
    // Obtenemos el historial de actividades del usuario
    this.reActividadService.obtenerHistorialPorUsuario().subscribe(
      (response) => {
        this.actividades.data = response;  // Asignamos los datos recibidos al dataSource
        this.actividadesOriginal = [...response];  // Guardamos el estado original
        console.log('Actividades recibidas:', this.actividades.data);

        // Extraemos los tipos de residuos únicos de las actividades
        this.residuosDisponibles = [...new Set<string>(response.map((actividad: any) => actividad.residuoNombre))];
      },
      (error) => {
        console.error('Error al obtener el historial de actividades', error);
      }
    );
  }

  // Filtro por nombre de actividad
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtroNombre = filterValue.trim().toLowerCase();
    this.applyFilters();  // Aplicamos todos los filtros
  }

  // Filtro por tipo de residuo
  applyResiduoFilter(event: MatSelectChange) {
    this.filtroResiduo = event.value;
    this.applyFilters();  // Aplicamos todos los filtros
  }

  // Filtro para ordenar por cantidad (mayor a menor o menor a mayor)
  applyCantidadSort(event: MatSelectChange) {
    this.ordenCantidad = event.value;
    this.applyFilters();  // Aplicamos todos los filtros
  }

  // Método para aplicar los filtros (por nombre, residuo, y orden de cantidad)
  applyFilters() {
    // Filtramos por nombre y residuo
    this.actividades.filterPredicate = (data: any, filter: string) => {
      const nameFilter = data.nombre.toLowerCase().includes(this.filtroNombre);  // Filtra por nombre
      const residuoFilter = this.filtroResiduo === '' || data.residuoNombre === this.filtroResiduo;  // Filtra por residuo
      return nameFilter && residuoFilter;
    };

    // Forzamos a que se aplique el filtro
    this.actividades.filter = Math.random().toString();  // Necesario para que se aplique

    // Aplicamos la ordenación por cantidad después de filtrar
    if (this.ordenCantidad === 'mayorMenor') {
      this.actividades.data = this.actividades.data.sort((a, b) => b.cantidad - a.cantidad);
    } else if (this.ordenCantidad === 'menorMayor') {
      this.actividades.data = this.actividades.data.sort((a, b) => a.cantidad - b.cantidad);
    } else if (this.ordenCantidad === 'todos') {
      // Restauramos el estado original si se selecciona "Todos"
      this.actividades.data = [...this.actividadesOriginal];
    }
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
