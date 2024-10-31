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

    this.residuoService.getAllResiduos({ page: pageIndex, size: pageSize }).subscribe(data => {
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
         <input id="tipo" class="swal2-input" placeholder="Tipo" value="${residuo.tipo}">
         <input id="puntos" class="swal2-input" placeholder="Puntos" type="number" value="${residuo.puntos}">`,
      focusConfirm: false,
      preConfirm: () => {
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value;
        const tipo = (document.getElementById('tipo') as HTMLInputElement).value;
        const puntos = (document.getElementById('puntos') as HTMLInputElement).value;

        // Validaciones de nombre y descripción
        const soloLetrasRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/;

        if (!nombre || !soloLetrasRegex.test(nombre) || nombre.length > 50) {
          Swal.showValidationMessage('El nombre solo debe contener letras, sin números y máximo 50 caracteres.');
          return false;
        }

        if (!descripcion || !soloLetrasRegex.test(descripcion) || descripcion.length > 40) {
          Swal.showValidationMessage('La descripción solo debe contener letras, sin números y máximo 40 caracteres.');
          return false;
        }

        if (!soloLetrasRegex.test(tipo) || tipo.length > 30) {
          Swal.showValidationMessage('El tipo solo debe contener letras, sin números y máximo 30 caracteres.');
          return false;
        }

        if (isNaN(Number(puntos)) || Number(puntos) <= 0) {
          Swal.showValidationMessage('Los puntos deben ser un número mayor a 0.');
          return false;
        }

        return { nombre, descripcion, tipo, puntos, id: residuo.id };
      },
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const { nombre, descripcion } = result.value;

        // Validar si el nombre o la descripción ya existen
        const { nombreDuplicado, descripcionDuplicada } = this.validarDuplicados(nombre, descripcion, residuo.id);

        if (nombreDuplicado) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ya existe un residuo con el mismo nombre.'
          });
        } else if (descripcionDuplicada) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ya existe un residuo con la misma descripción.'
          });
        } else {
          // Si no hay duplicados, actualizar el residuo
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
      }
    });
  }

  validarDuplicados(nombre: string, descripcion: string, id: number): { nombreDuplicado: boolean; descripcionDuplicada: boolean } {
    const nombreDuplicado = this.residuos.some(
      (residuo) => residuo.nombre.toLowerCase() === nombre.toLowerCase() && residuo.id !== id
    );

    const descripcionDuplicada = this.residuos.some(
      (residuo) => residuo.descripcion.toLowerCase() === descripcion.toLowerCase() && residuo.id !== id
    );

    return { nombreDuplicado, descripcionDuplicada };
  }
}
