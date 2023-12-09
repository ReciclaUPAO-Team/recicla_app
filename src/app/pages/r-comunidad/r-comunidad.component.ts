import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadService } from 'src/app/service/comunidad.service';

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
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  onSubmit(): void {
    if (this.comunidadForm.valid) {
      this.comunidadService.registrarComunidad(this.comunidadForm.value).subscribe(
        response => {
          // Aquí manejas la respuesta. Por ejemplo, mostrar un mensaje de éxito
          console.log('Comunidad registrada con éxito:', response);
        },
        error => {
          // Aquí manejas los errores. Por ejemplo, mostrar un mensaje de error
          console.error('Error al registrar la comunidad:', error);
        }
      );
    }
  }
}
