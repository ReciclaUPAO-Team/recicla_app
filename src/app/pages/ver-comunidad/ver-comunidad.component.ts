import { Component, OnInit } from '@angular/core';
import { ComunidadService } from 'src/app/service/comunidad.service';
import { Comunidad } from 'src/app/Modelo/comunidad';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-comunidad',
  templateUrl: './ver-comunidad.component.html',
  styleUrls: ['./ver-comunidad.component.css']
})
export class VerComunidadComponent implements OnInit {
  comunidades: Comunidad[] = [];

  constructor(private comunidadService: ComunidadService) { }

  ngOnInit(): void {
    this.cargarComunidades();
  }

  cargarComunidades(): void {
    this.comunidadService.listarComunidades().subscribe(
      (response) => {
        this.comunidades = response.content;
      },
      (error) => {
        console.error('Error al obtener las comunidades', error);
      }
    );
  }

  eliminarComunidad(nombreComunidad: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comunidadService.eliminarComunidad(nombreComunidad).subscribe(
          response => {
            Swal.fire(
              'Eliminado!',
              'La comunidad ha sido eliminada.',
              'success'
            );
            this.cargarComunidades();
          },
          error => {
            console.error('Error al eliminar la comunidad', error);
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar la comunidad.',
              'error'
            );
          }
        );
      }
    });
  }

  editarComunidad(comunidad: Comunidad): void {
    Swal.fire({
      title: 'Editar Comunidad',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre" value="${comunidad.nombre}">
        <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${comunidad.descripcion}">
      `,
      confirmButtonText: 'Guardar',
      focusConfirm: false,
      preConfirm: () => {
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value;
        return { nombre: nombre, descripcion: descripcion };
      }
    }).then((result) => {
      if (result.isConfirmed && comunidad.nombre) {
        const datosActualizados = result.value;
        this.comunidadService.actualizarComunidad(comunidad.nombre, datosActualizados).subscribe({
          next: (response) => {
            const index = this.comunidades.findIndex(c => c.nombre === comunidad.nombre);
            if (index !== -1) {
              this.comunidades[index] = { ...this.comunidades[index], ...datosActualizados };
            }
            Swal.fire('Guardado', 'Los cambios se han guardado con éxito', 'success');
          },
          error: (error) => {
            console.error('Error completo:', error);
            Swal.fire('Error', `Hubo un problema al actualizar la comunidad: ${error.message}`, 'error');
          }
        });
      }
    });
  }
}
