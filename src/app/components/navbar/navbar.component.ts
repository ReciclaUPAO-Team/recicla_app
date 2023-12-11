// En NavbarComponent.ts

import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userName: string = '';

  constructor(public login: LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    if (this.isLoggedIn) {
      this.userName = this.login.getUserName(); // Actualizar para obtener el nombre de usuario
    }
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }
}
