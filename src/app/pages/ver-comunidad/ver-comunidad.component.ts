// En tu componente VerComunidad (ver-comunidad.component.ts)
import { Component, OnInit } from '@angular/core';
import { ComunidadService } from 'src/app/service/comunidad.service';
import { Comunidad } from 'src/app/Modelo/comunidad';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-ver-comunidad',
  templateUrl: './ver-comunidad.component.html',
  styleUrls: ['./ver-comunidad.component.css']
})
export class VerComunidadComponent implements OnInit {
  comunidades: Comunidad[] = [];
  usuarioIdActual: number;

  constructor(private comunidadService: ComunidadService, private loginService: LoginService) {
    // Obten el ID del usuario actual
    this.usuarioIdActual = this.loginService.getUserId();
  }

  ngOnInit(): void {
    this.usuarioIdActual = this.loginService.getUserId();
    console.log('Usuario ID Actual:', this.usuarioIdActual); // Añade esto para depurar
    this.cargarComunidades();
  }
  
  
  cargarComunidades(): void {
    this.comunidadService.listarComunidades().subscribe(
      (comunidades) => {
        this.comunidades = comunidades; // Asumiendo que recibes un array directamente
        // Si la respuesta no es un array directamente, ajusta la lógica aquí.
        // Inicializa la propiedad 'yaUnido' para cada comunidad
        this.comunidades.forEach(comunidad => {
          comunidad.esCreador = comunidad.creadorId === this.usuarioIdActual;
          comunidad.yaUnido = false; // Inicialmente establece todos como no unidos
          // Aquí deberías verificar si el usuario actual ya se ha unido a la comunidad
          // Puedes hacerlo llamando a una función que haga esta verificación
        });
      },
      (error) => {
        console.error('Error al obtener las comunidades', error);
        // Maneja el error aquí
      }
    );
  }

  // Función para verificar si el usuario pertenece a la comunidad (ajusta según la estructura de tus datos)
  usuarioPerteneceAComunidad(comunidad: Comunidad): boolean {
    // Implementa la lógica para verificar si el usuario pertenece a la comunidad
    // Ajusta esta función según la estructura real de tus datos y cómo verificas la pertenencia del usuario
    return false; // Debes implementar esta lógica correctamente
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
  obtenerUsuarioIdActual(): number {
    // Implementa la lógica para obtener el ID del usuario actual
    const userDetails = this.loginService.getUserDetails();
    return userDetails?.id;
  }
  unirseComunidad(idComunidad: number): void {
    this.comunidadService.unirseComunidad(idComunidad).subscribe({
      next: (response) => {
        // Si el backend no envía un cuerpo de respuesta, simplemente puedes comprobar si la operación fue exitosa
        // basándote en el status code de la respuesta
        if (response === 200 || response === 204) {
          // Actualiza el estado 'yaUnido' para la comunidad correspondiente
          const comunidadIndex = this.comunidades.findIndex(c => c.id === idComunidad);
          if (comunidadIndex !== -1) {
            this.comunidades[comunidadIndex].yaUnido = true;
          }
          Swal.fire('Unido', 'Te has unido a la comunidad exitosamente', 'success');
        }
      },
      error: (error) => {
        console.error('Error al unirse a la comunidad', error);
        Swal.fire('Error', 'Hubo un problema al unirse a la comunidad', 'error');
      }
    });
  }
  
  
  
}
