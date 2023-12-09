import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RRecompensaService } from 'src/app/service/r-recompensa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-recompensa',
  templateUrl: './registrar-recompensa.component.html',
  styleUrls: ['./registrar-recompensa.component.css']
})
export class RegistrarRecompensaComponent {
  recompensaForm: FormGroup;
  imagenPath: File | null = null;

  constructor(
    private fb: FormBuilder,
    private recompensaService: RRecompensaService
  ) { 
    this.recompensaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      valor: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
        this.imagenPath = input.files[0];
       
    }
}

  onSubmit(): void {
    if (this.recompensaForm.valid && this.imagenPath) {
      const formData = new FormData();
      formData.append('titulo', this.recompensaForm.value.titulo);
      formData.append('descripcion', this.recompensaForm.value.descripcion);
      formData.append('categoria', this.recompensaForm.value.categoria);
      formData.append('valor', this.recompensaForm.value.valor.toString());
      formData.append('imagen', this.imagenPath, this.imagenPath.name);
  
      this.recompensaService.registrarRecompensa(formData).subscribe(
        (response) => {
          console.log(response);
          Swal.fire('Éxito', 'Recompensa registrada con éxito', 'success');
        },
        error => {
          let errorMessage = 'Ha ocurrido un error en el sistema !!';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          Swal.fire('Error', errorMessage, 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Por favor, completa todos los campos del formulario y selecciona una imagen', 'error');
    }
  }
  
}
