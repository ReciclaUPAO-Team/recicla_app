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
  residuos: Residuo[] = [];  // Almacena los residuos cargados

  constructor(
    private fb: FormBuilder,
    private reActividadService: ReActividadService,
    private residuoService: ResiduoService,  // Inyecta el servicio de residuos
    private snack: MatSnackBar
  ) {
    this.actividadForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
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
    }
  }
}
