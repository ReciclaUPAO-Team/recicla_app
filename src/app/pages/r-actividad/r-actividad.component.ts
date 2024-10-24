import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReActividadService } from '../../service/re-actividad.service';
import { ResiduoService } from '../../service/residuo.service';  // Importa el servicio de residuos
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Residuo } from '../../Modelo/residuo';  // Importa el modelo de residuos

@Component({
  selector: 'app-r-actividad',
  templateUrl: './r-actividad.component.html',
  styleUrls: ['./r-actividad.component.css']
})
export class RActividadComponent implements OnInit {
  actividadForm: FormGroup;
  imagenArchivo: File | null = null;
  imageTouched: boolean = false; // Para controlar si la imagen fue tocada
  residuos: Residuo[] = [];  // Almacena los residuos cargados

  constructor(
    private fb: FormBuilder,
    private reActividadService: ReActividadService,
    private residuoService: ResiduoService,  // Inyecta el servicio de residuos
    private snack: MatSnackBar
  ) {
    this.actividadForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/), Validators.maxLength(30)]],
      cantidad: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]],
      nombreResiduo: ['', Validators.required]  // Aquí estará el residuo seleccionado
    });
  }

  ngOnInit(): void {
    // Carga los residuos cuando el componente se inicializa
    this.residuoService.getAllResiduos({}).subscribe(
      (data) => {
        this.residuos = data.content;  // Supongo que data.content contiene la lista de residuos
      },
      (error) => {
        console.log(error);
        this.snack.open('Error al cargar los residuos', 'Aceptar', {
          duration: 3000,
        });
      }
    );
  }

  onFileSelected(event: Event): void {
    this.imageTouched = true;
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
      formData.append('nombreResiduo', this.actividadForm.value.nombreResiduo);  // Residuo seleccionado
      formData.append('image', this.imagenArchivo);

      this.reActividadService.registrarActividad(formData).subscribe(
        (response) => {
          console.log(response);
          Swal.fire('Éxito', 'Actividad registrada con éxito', 'success');
        },
        (error) => {
          console.log(error);
          let errorMessage = 'Ha ocurrido un error en el sistema !!';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.snack.open(errorMessage, 'Aceptar', {
            duration: 3000
          });
        }
      );
    } else {
      this.imageTouched = true; // Si se intenta enviar sin imagen
      Swal.fire('Error', 'Por favor, completa todos los campos y selecciona una imagen', 'error');
    }
  }

  onReset(): void {
    this.actividadForm.reset(); // Restablece el formulario
    this.imagenArchivo = null;  // Restablece la imagen
    this.imageTouched = false;  // Reinicia el estado de la imagen tocada
  }
}
