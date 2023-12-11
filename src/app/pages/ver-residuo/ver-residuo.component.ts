import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ResiduoService } from 'src/app/service/residuo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-residuo',
  templateUrl: './ver-residuo.component.html',
  styleUrls: ['./ver-residuo.component.css']
})
export class VerResiduoComponent implements OnInit {
  residuos: any[] = [];
  totalElements: number = 0;
  currentPage: number = 0;

  constructor(private residuoService: ResiduoService) { }

  ngOnInit() {
    this.cargarResiduos();
  }

  cargarResiduos(event?: PageEvent) {
    let pageIndex = event ? event.pageIndex : this.currentPage;
    let pageSize = event ? event.pageSize : 10;

    this.residuoService.getAllResiduos({page: pageIndex, size: pageSize}).subscribe(data => {
      this.residuos = data.content;
      this.totalElements = data.totalElements;
      this.currentPage = data.number;
    });
  }

  eliminarResiduo(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.residuoService.deleteResiduoById(id).subscribe(() => {
          Swal.fire(
            '¡Eliminado!',
            'El residuo ha sido eliminado.',
            'success'
          );
          this.cargarResiduos(); // Recargar los residuos
        }, error => {
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar el residuo.',
            'error'
          );
        });
      }
    });
  }

  actualizarResiduo(residuo: any) {
    Swal.fire({
      title: 'Actualizar Residuo',
      html:
        `<input id="nombre" class="swal2-input" placeholder="Nombre" value="${residuo.nombre}">
         <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${residuo.descripcion}">
         <input id="tipo" class="swal2-input" placeholder="Tipo" value="${residuo.tipo}">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          nombre: (document.getElementById('nombre') as HTMLInputElement).value,
          descripcion: (document.getElementById('descripcion') as HTMLInputElement).value,
          tipo: (document.getElementById('tipo') as HTMLInputElement).value,
          id: residuo.id
        }
      },
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.residuoService.updateResiduo(result.value).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: 'Residuo Actualizado',
              text: 'El residuo ha sido actualizado correctamente.'
            });
            this.cargarResiduos();
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al actualizar el residuo.'
            });
          }
        );
      }
    });
  }

}
