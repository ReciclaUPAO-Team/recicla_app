import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadService } from 'src/app/service/comunidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-r-comunidad',
  templateUrl: './r-comunidad.component.html',
  styleUrls: ['./r-comunidad.component.css']
})
export class RComunidadComponent implements OnInit {
  comunidadForm!: FormGroup; // Uso del operador de asertación no nula

  constructor(
    private fb: FormBuilder,
    private comunidadService: ComunidadService
  ) {}

  ngOnInit(): void {
    this.comunidadForm = this.fb.group({
      nombre: ['', Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/), Validators.maxLength(30)],
      descripcion: ['', Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/), Validators.maxLength(200)]
    });
  }

  onSubmit(): void {
    if (this.comunidadForm.valid) {
      this.comunidadService.registrarComunidad(this.comunidadForm.value).subscribe(
        response => {
          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            title: '¡Éxito!',
            text: 'Comunidad registrada con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          console.log('Comunidad registrada con éxito:', response);
        },
        error => {
          // Mostrar mensaje de error con SweetAlert2
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al registrar la comunidad',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.error('Error al registrar la comunidad:', error);
        }
      );
    } else {
      // Mostrar mensaje si el formulario no es válido
      Swal.fire({
        title: 'Error',
        text: 'Por favor completa todos los campos requeridos',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  
}
