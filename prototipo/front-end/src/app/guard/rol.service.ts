import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { PermissionsService } from '../service/permissions.service';



@Injectable({
  providedIn: 'root'
})
export class RolService implements CanActivate {

  constructor(public auth: PermissionsService, public router: Router) {}
  canActivate() {
    if (this.auth.getUserRol()) {
      alert('Usted no es administrador')
      this.router.navigate(['home']);
      return false;
    }else{
      return true;
    }
  }
}
