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
        // Muestra un mensaje de éxito
        Swal.fire({
          title: '¡Éxito!',
          text: 'Recompensa canjeada con éxito',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error => {
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
      showCancelButton: true, // Mostrar el botón de cancelar
      confirmButtonText: 'Aceptar', // Texto del botón de confirmar
      cancelButtonText: 'Cancelar', // Texto del botón de cancelar
      preConfirm: () => {
        return {
          titulo: (<HTMLInputElement>document.getElementById('titulo')).value,
          descripcion: (<HTMLInputElement>document.getElementById('descripcion')).value,
          valor: (<HTMLInputElement>document.getElementById('valor')).value
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Construye aquí el objeto de recompensa actualizado
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
