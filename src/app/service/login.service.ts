import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baserUrl from './helper';
import { jwtDecode } from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //generamos el token
  public generateToken(loginData: any) {
    return this.http.post(`${baserUrl}/usuario/login`, loginData);
  }

  //Agregamos los datos del usuario
  public generarDatos() {

  }

  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token: string) {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token) as any;
    //console.log(decodedToken); // Depurar para ver la estructura del token
    localStorage.setItem('role', decodedToken.role);
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //cerranis sesion y eliminamos el token del localStorage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtenemos el token
  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';

    try {
      const decodedToken = jwtDecode(token) as any;
      return decodedToken.role || ''; // Retorna una cadena vacía si 'role' no está presente
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return '';
    }
  }
  public getUserDetails() {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }
  public getUserName(): string {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.username; // Asegúrate de que 'username' es la clave correcta en el token
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return '';
      }
    }
    return '';
  }
  public getUserId(): number {
    const userDetails = this.getUserDetails();
    return userDetails ? userDetails.id : 0; // Asegúrate de que 'id' es la propiedad correcta en el token
  }

}
