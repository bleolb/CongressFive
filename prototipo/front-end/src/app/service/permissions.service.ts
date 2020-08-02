import { Injectable } from '@angular/core';
import { Data } from '../models/data';
import { Person } from '../models/person';
import * as jwt_decode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  datarx:Data;
  private token: string;
  private usuarioLogin:Person;
  private rol: string;
    constructor() {
      this.token=null;
      this.usuarioLogin;
    }
  decodificarToken(token: string): boolean {
    const decoded = jwt_decode(token);
    if (decoded) {
      this.token = token || null;
      this.usuarioLogin = decoded || null;
      this.rol= this.usuarioLogin.rol;
      console.log(this.rol)
      return true;
    } else {
      return false;
    }
  }
  public isAuthenticated(): boolean {
      return this.token ===null;
    }
  obtenerToken(): string {
    return this.token;
  }
  
  destruirToken(): void {
    this.token = null;
  }
  
  getUserLogin(): object {
    return this.usuarioLogin;
  }
  
  getUserRol(): boolean {
    return this.rol != "Administrador";
  }
  
}
