import { Component, OnInit } from '@angular/core';
import { Recompensa } from 'src/app/Modelo/recompensa';
import { LoginService } from 'src/app/service/login.service';
import { RRecompensaService } from 'src/app/service/r-recompensa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-recompensa',
  templateUrl: './ver-recompensa.component.html',
  styleUrls: ['./ver-recompensa.component.css']
})
export class VerRecompensaComponent implements OnInit {
  recompensas: Recompensa[] = []; // Si esperas un array de Recompensas
  esParticipante: boolean = true; // Añade esta línea}

  constructor(private recompensaService: RRecompensaService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.cargarRecompensas();
    this.verificarRolUsuario();
  }

  cargarRecompensas(): void {
    this.recompensaService.listarRecompensa().subscribe(
      (data: any) => { // Especifica un tipo apropiado en lugar de 'any' si es posible
        this.recompensas = data.content; // Asegúrate de que 'data.content' es correcto según tu estructura de respuesta
      },
      (error: any) => { // Especifica un tipo apropiado en lugar de 'any'
        console.error('Error al obtener recompensas', error);
      }
    );
  }
  canjearRecompensa(nombreRecompensa: string): void {
    this.recompensaService.canjearRecompensa(nombreRecompensa).subscribe(
      response => {
        console.log(response); // Para depuración
        // Muestra un mensaje de éxito
        Swal.fire({
          title: '¡Éxito!',
          text: response.message, // Usa el mensaje de la respuesta
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error => {
        console.log(error); // Para depuración
        // Muestra un mensaje de error
        Swal.fire({
          title: 'Error',
          text: 'Error te quedaste sin puntos',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

  eliminarRecompensa(id: number): void {
    this.recompensaService.eliminarRecompensa(id).subscribe(
      response => {
        Swal.fire('Eliminado!', 'La recompensa ha sido eliminada.', 'success');
        this.cargarRecompensas();
      },
      error => {
        if (error.status === 400 || error.status === 422) { // Ajusta los códigos de estado según tu backend
          // Muestra un mensaje específico para recompensas canjeadas
          Swal.fire('Error', 'No se puede eliminar una recompensa que ya ha sido canjeada.', 'error');
        } else {
          // Manejo de otros tipos de errores
          Swal.fire('Error', 'Ocurrió un error al intentar eliminar la recompensa.', 'error');
        }
      }
    );
  }
  confirmarEliminacion(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarRecompensa(id);
      }
    });
  }

  verificarRolUsuario(): void {
    const rol = this.loginService.getUserRole();
    this.esParticipante = rol === 'PARTICIPANTE';
  }

  editarRecompensa(recompensa: Recompensa): void {
    Swal.fire({
      title: 'Editar Recompensa',
      html: `
      <div class="swal2-label">Título</div>
      <input id="titulo" class="swal2-input" placeholder="Título" value="${recompensa.titulo}">

      <div class="swal2-label">Descripción</div>
      <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${recompensa.descripcion}">

      <div class="swal2-label">Valor</div>
      <input id="valor" type="number" class="swal2-input" placeholder="Valor" value="${recompensa.valor}">
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const titulo = (<HTMLInputElement>document.getElementById('titulo')).value;
        const descripcion = (<HTMLInputElement>document.getElementById('descripcion')).value;
        const valor = (<HTMLInputElement>document.getElementById('valor')).value;

        if (!titulo || !descripcion || !valor) {
          Swal.showValidationMessage('Todos los campos son obligatorios.');
          return false;
        }

        const soloLetrasRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/;
        if (!soloLetrasRegex.test(titulo)) {
          Swal.showValidationMessage('El título solo debe contener letras y espacios.');
          return false;
        }
        if (titulo.length > 40) {
          Swal.showValidationMessage('El título no debe exceder los 40 caracteres.');
          return false;
        }
        if (!soloLetrasRegex.test(descripcion)) {
          Swal.showValidationMessage('La descripción solo debe contener letras y espacios.');
          return false;
        }
        if (descripcion.length > 30) {
          Swal.showValidationMessage('La descripción no debe exceder los 30 caracteres.');
          return false;
        }
        if (isNaN(Number(valor)) || Number(valor) <= 0) {
          Swal.showValidationMessage('El valor debe ser un número mayor que 0.');
          return false;
        }

        // Verifica si ya existe otra recompensa con el mismo título o descripción
        const recompensaDuplicada = this.verificarDuplicado(titulo, descripcion, recompensa.id);
        if (recompensaDuplicada) {
          Swal.showValidationMessage('Ya existe otra recompensa con el mismo título o descripción.');
          return false;
        }

        return { titulo, descripcion, valor };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const recompensaActualizada = {
          ...recompensa,
          titulo: result.value.titulo,
          descripcion: result.value.descripcion,
          valor: result.value.valor
        };

        this.actualizarRecompensa(recompensaActualizada);
      }
    });
  }

// Función para verificar si hay recompensas duplicadas al editar
  verificarDuplicado(titulo: string, descripcion: string, id: number): boolean {
    return this.recompensas.some(
      recompensa =>
        (recompensa.titulo.toLowerCase() === titulo.toLowerCase() ||
          recompensa.descripcion.toLowerCase() === descripcion.toLowerCase()) &&
        recompensa.id !== id
    );
  }

  actualizarRecompensa(recompensaActualizada: Recompensa): void {
    console.log('Recompensa a actualizar:', recompensaActualizada);

    this.recompensaService.actualizarRecompensa(recompensaActualizada).subscribe(
      data => {
        Swal.fire('¡Actualizado!', 'La recompensa ha sido actualizada con éxito.', 'success');
        this.cargarRecompensas();
      },
      error => {
        Swal.fire('Error', 'Hubo un problema al actualizar la recompensa.', 'error');
      }
    );
  }


}
