// En NavbarComponent.ts

import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userName: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userName = this.loginService.getUserName();
    }
  }
  ngDoCheck(): void {
    // Verifica el estado de inicio de sesión en cada ciclo de detección de cambios
    this.isLoggedIn = this.loginService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userName = this.loginService.getUserName();
    }
  }

  navigateToDashboard(): void {
    if (this.loginService.isLoggedIn()) {
      const role = this.loginService.getUserRole();
      if (role === 'ADMINISTRADOR') {
        this.router.navigate(['/admin']);
      } else if (role === 'PARTICIPANTE') {
        this.router.navigate(['/user']);
      }
      // Agrega más roles y rutas según sea necesario
    }
  }

  public logout() {
    this.loginService.logout(); // Utiliza el método logout del servicio loginService
    this.isLoggedIn = false; // Actualiza la variable isLoggedIn
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }
  
}
