import {Injectable} from '@angular/core';
import {PermissionsService} from './permissions.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private url: string;

  constructor(private permissions: PermissionsService) {
    this.url = 'http://localhost:27017/api';
  }

  obtainUrl(): string {
    return this.url;
  }

  obtainHeaders(): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.permissions.obtainToken()
      })
    };
  }
}
