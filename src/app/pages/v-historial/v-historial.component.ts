import { Component, OnInit } from '@angular/core';
import { ReActividadService } from 'src/app/service/re-actividad.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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

  // Función para exportar los datos visibles a PDF
  exportarPDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Historial de Actividades', 10, 10);

    // Capturamos las actividades visibles en la tabla
    const actividadesFiltradas = this.actividades.filteredData;

    // Mapeamos los datos para agregarlos a la tabla del PDF
    const body = actividadesFiltradas.map((actividad: any) => [
      actividad.nombre,
      actividad.cantidad,
      actividad.residuoNombre,
      actividad.puntosGanados,
      new Date(actividad.fecha).toLocaleString(),
    ]);

    // Definimos las columnas para el PDF
    const head = [['Nombre', 'Cantidad', 'Residuo', 'Puntos Ganados', 'Fecha']];

    // Generamos la tabla en el PDF
    (doc as any).autoTable({
      head: head,
      body: body,
      startY: 20, // Ajustamos la posición vertical para que no sobreponga el título
    });

    // Guardamos el PDF con un nombre específico
    doc.save('historial_actividades.pdf');
  }

  // Función para exportar a CSV
  exportarCSV(): void {
    const actividadesFiltradas = this.actividades.filteredData;
    const csvRows = [];

    // Agregamos la cabecera
    const headers = ['Nombre', 'Cantidad', 'Residuo', 'Puntos Ganados', 'Fecha'];
    csvRows.push(headers.join(',')); // Añadimos las columnas al CSV

    // Mapeamos los datos filtrados
    actividadesFiltradas.forEach((actividad: any) => {
      const row = [
        actividad.nombre,
        actividad.cantidad,
        actividad.residuoNombre,
        actividad.puntosGanados,
        new Date(actividad.fecha).toLocaleString(),
      ];
      csvRows.push(row.join(',')); // Añadimos cada fila
    });

    // Generamos el archivo CSV
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'historial_actividades.csv');
    document.body.appendChild(link);

    link.click(); // Hacemos clic en el link para descargar el archivo
    document.body.removeChild(link); // Eliminamos el link después de la descarga
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
