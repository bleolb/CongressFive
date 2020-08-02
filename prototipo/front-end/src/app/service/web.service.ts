import { Injectable } from '@angular/core';
import { PermissionsService } from '../service/permissions.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private url: string;

  constructor(private permissions: PermissionsService) {
    this.url = 'http://localhost:27017/api/';
  }

  getUrl(): string {
    return this.url;
  }

  getHeaders(): object {
    const optionsHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.permissions.obtenerToken(),
      }),
    };
    return optionsHeaders;
  }
}