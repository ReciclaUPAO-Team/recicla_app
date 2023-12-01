import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLoggedIn = false;
  user: any = null;

  constructor(public login:LoginService){
    
  }
  ngOnInit(): void {}

  public logout(){
    this.login.logout();
    window.location.reload();
  }
}
