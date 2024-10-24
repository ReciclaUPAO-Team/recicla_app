import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    nombre: '',
    edad : '',
    telefono : '',
    correo : '',
    username: '',
    password: '',
    dni:'',
  }

  constructor(private userService:UserService,private snack:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    // Registra el usuario
    this.userService.addUsuario(this.user).subscribe(
      (data) => {
        console.log(data);

        // Muestra la alerta y espera que el usuario interactúe
        Swal.fire({
          title: 'Usuario guardado',
          text: 'Usuario registrado con éxito en el sistema',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirige al componente de login después de que el usuario cierre el Swal
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
