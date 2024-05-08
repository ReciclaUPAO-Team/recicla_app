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
  userRole: string = '';  // Añade esta línea

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  ngDoCheck(): void {
    this.checkLoginStatus();
  }

  private checkLoginStatus() {
    this.isLoggedIn = this.loginService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userName = this.loginService.getUserName();
      this.userRole = this.loginService.getUserRole();  // Obtén el rol del usuario
    }
  }

  redirectHome(): void {
    // Solo redirige si el usuario no está logueado
    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  navigateToDashboard(): void {
    if (this.isLoggedIn && this.userRole === 'PARTICIPANTE') {
      this.router.navigate(['/user/ver-estadistica']);
    }
  }

  public logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
