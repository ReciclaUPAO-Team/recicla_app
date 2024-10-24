import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      edad: ['', [Validators.required, Validators.min(16), Validators.max(100)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]]
    });
  }

  formSubmit() {
    if (this.signupForm.invalid) {
      this.snack.open('Por favor, complete los campos requeridos correctamente', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    this.userService.addUsuario(this.signupForm.value).subscribe(
      (data) => {
        Swal.fire({
          title: 'Usuario guardado',
          text: 'Usuario registrado con éxito en el sistema',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/login';
          }
        });
      }, (error) => {
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

