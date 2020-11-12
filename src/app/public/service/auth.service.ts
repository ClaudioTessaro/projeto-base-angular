import { Usuario } from './../model/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = `${environment.API}`;

  token: string;

  constructor(
    private http: HttpClient
  ) { }

  autenticar(usuario: Usuario){
    return this.http.post(`${this.API}session/signin`, usuario).pipe(take(1)).pipe(map((response: any) => {
      this.token = response.token;
      localStorage.setItem('token',this.token)
    }));


  }

  autenticado(): boolean {
    if(this.token === undefined && localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token')
    }
    return this.token !== undefined;
  }
}

