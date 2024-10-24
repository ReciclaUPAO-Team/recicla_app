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
  imageTouched: boolean = false; // Para controlar si la imagen fue tocada

  constructor(
    private fb: FormBuilder,
    private recompensaService: RRecompensaService
  ) {
    this.recompensaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/), Validators.maxLength(40)]],
      descripcion: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/), Validators.maxLength(50)]],
      categoria: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/), Validators.maxLength(30)]],
      valor: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    this.imageTouched = true;
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
      formData.append('categoria', this.recompensaForm.value.categoria);
      formData.append('valor', this.recompensaForm.value.valor);
      formData.append('imagenPath', this.imagenArchivo);

      this.recompensaService.registrarRecompensa(formData).subscribe(
        (response) => {
          Swal.fire('Éxito', 'Recompensa registrada con éxito', 'success');
        },
        (error) => {
          console.error('Error al registrar la recompensa:', error);
          Swal.fire('Error', 'La imagen excede los límites de tamaño (5mb)', 'error');
        }
      );
    } else {
      this.imageTouched = true; // Si se intenta enviar el formulario sin imagen
      Swal.fire('Error', 'Por favor, completa todos los campos y selecciona una imagen', 'error');
    }
  }

  onReset(): void {
    this.recompensaForm.reset(); // Restablece el formulario
    this.imagenArchivo = null;   // Restablece el archivo de la imagen
    this.imageTouched = false;   // Restablece el estado de la imagen
  }
}
