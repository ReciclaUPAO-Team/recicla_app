import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RRecompensaService } from 'src/app/service/r-recompensa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-recompensa',
  templateUrl: './registrar-recompensa.component.html',
  styleUrls: ['./registrar-recompensa.component.css']
})
export class RegistrarRecompensaComponent implements OnInit {
  recompensaForm: FormGroup;
  imagenArchivo: File | null = null;

  constructor(
    private fb: FormBuilder,
    private recompensaService: RRecompensaService
  ) { 
    this.recompensaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
        this.imagenArchivo = input.files[0];
    }
}

  onSubmit(): void {
    if (this.recompensaForm.valid && this.imagenArchivo) {

      const formData = new FormData();
        formData.append('titulo', this.recompensaForm.value.titulo);
        formData.append('descripcion', this.recompensaForm.value.descripcion);
        formData.append('categoria',this.recompensaForm.value.categoria);
        formData.append('valor', this.recompensaForm.value.valor);
        formData.append('imagenPath', this.imagenArchivo);


      this.recompensaService.registrarRecompensa(formData).subscribe(
        (response) => {
          Swal.fire('Éxito', 'Recompensa registrada con éxito', 'success');
        
        },
        (error) => {
          console.error('Error al registrar la recompensa:', error);
          Swal.fire('Error', 'Ocurrió un error al registrar la recompensa', 'error');
         
        }
      );
    } else {
      Swal.fire('Error', 'Por favor, completa todos los campos y selecciona una imagen', 'error');
    }
  }
}
