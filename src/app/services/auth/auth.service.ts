import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url
  constructor( private http: HttpClient ) {}

  login(data: any) {
    return this.http.post<any>(this.url + '/auth/login', data);
  }

  signup(data: any) {
    return this.http.post<any>(this.url + '/auth/signup', data);
  }
}
