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
          residuo_id: ['', Validators.required],
          usuario_id: ['', Validators.required]
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
        formData.append('residuo_id', this.actividadForm.value.residuo_id.toString());
        formData.append('usuario_id', this.actividadForm.value.usuario_id.toString());
        formData.append('image', this.imagenArchivo, this.imagenArchivo.name);

        this.reActividadService.registrarActividad(formData).subscribe(
          (response) => {
            console.log(response);
            Swal.fire('Actividad registrada','con éxito','success');
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
  }}
