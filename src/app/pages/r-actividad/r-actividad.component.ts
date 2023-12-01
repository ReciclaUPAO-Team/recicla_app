import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReActividadService } from '../../service/re-actividad.service';
import { Actividad } from '../../Modelo/actividad';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-r-actividad',
    templateUrl: './r-actividad.component.html',
    styleUrls: ['./r-actividad.component.css']
})
export class RActividadComponent {
  actividadForm: FormGroup;
  imagenArchivo: File | null = null;

  constructor(private fb: FormBuilder, private reActividadService: ReActividadService, private snack:MatSnackBar) {
      this.actividadForm = this.fb.group({
          nombre: ['', Validators.required],
          cantidad: ['', Validators.required],
          residuo: ['', Validators.required],
          usuarioId: ['', Validators.required]
      });
  }

  onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length) {
          this.imagenArchivo = input.files[0];
      }
  }

  submitForm(): void {
      if (this.actividadForm.valid && this.imagenArchivo) {
          const formData = new FormData();
          formData.append('nombre', this.actividadForm.value.nombre);
          formData.append('cantidad', this.actividadForm.value.cantidad.toString());
          formData.append('residuo', this.actividadForm.value.residuo.toString());
          formData.append('usuarioId', this.actividadForm.value.usuarioId.toString());
          formData.append('image', this.imagenArchivo, this.imagenArchivo.name);

          this.reActividadService.registrarActividad(formData).subscribe(
            (data) => {
              console.log(formData);
              Swal.fire('Actividad registrada','con exito','success');
            },(error) => {
              console.log(error);
              let errorMessage = 'Ha ocurrido un error en el sistema !!';
              if (error.error && error.error.message) {
                errorMessage = error.error.message;
              }
              this.snack.open(errorMessage, 'Aceptar', {
                duration: 3000
              });
            }
            
          )
      }
  }
}

