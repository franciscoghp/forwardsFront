import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  public currentToken() {
    const tokenLocalStorage : any = localStorage.getItem('token');
    return tokenLocalStorage;
  }

  public getHeaders() {
    const token = this.currentToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return headers;
  }

  // headers = this.getHeaders()
  url = environment.url + '/ships'
  constructor( private http: HttpClient ) {}

  postShip(data: any){
    return this.http.post<any>(this.url, data, { headers: this.getHeaders() })
  }

  getShips(id: any){
    return this.http.get<any>(this.url + '/' + id, { headers: this.getHeaders() })
  }

  getShip(id: any){
    return this.http.get<any>(this.url + '/ship_id/' + id, { headers: this.getHeaders() })
  }

  update(id: number, data: any){
    return this.http.put<any>(this.url + '/' + id, data, { headers: this.getHeaders() })
  }

  delete(id: number){
    return this.http.delete<any>(this.url + '/' + id, { headers: this.getHeaders() })
  }
}
