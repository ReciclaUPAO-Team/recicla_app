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
  imagenBase64: string = '';

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
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        // Asegúrate de extraer solo la parte base64 de la cadena
        this.imagenBase64 = (reader.result as string).split(',')[1];
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.recompensaForm.valid && this.imagenBase64) {
      const recompensaData = {
        titulo: this.recompensaForm.value.titulo,
        descripcion: this.recompensaForm.value.descripcion,
        categoria: this.recompensaForm.value.categoria,
        valor: this.recompensaForm.value.valor,
        imagenPath: this.imagenBase64
      };

      this.recompensaService.registrarRecompensa(recompensaData).subscribe(
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
