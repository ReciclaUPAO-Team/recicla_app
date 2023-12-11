import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResiduoService } from '../../../app/service/residuo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-r-residuo',
  templateUrl: './r-residuo.component.html',
  styleUrls: ['./r-residuo.component.css']
})
export class RResiduoComponent {
  residuoForm: FormGroup;

  constructor(private residuoService: ResiduoService) {
    this.residuoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      puntos: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)])
    });
  }

  submitForm() {
    if (this.residuoForm.valid) {
      this.residuoService.addResiduo(this.residuoForm.value).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: '¡Residuo registrado!',
            text: 'El residuo ha sido registrado exitosamente.'
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al registrar el residuo.'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: 'Por favor, completa todos los campos del formulario.'
      });
    }
  }
}
