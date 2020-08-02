import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebService } from '../service/web.service';
import { Observable } from 'rxjs';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url:string;
  constructor(
    private http:HttpClient,
    private servidor:WebService,
  ) {
    this.url = this.servidor.getUrl();
   }

  login(datalogin: { person: { password: any; email: any; }; }):Observable<Data>{
   return this.http.post<Data>(`${this.url}login`, datalogin);
  }
}