import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private AUTH_API = "http://192.168.250.129:8080/springboot-backend-0.0.1-SNAPSHOT/api/v2";

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<Object>{
    return this.httpClient.post(`${this.AUTH_API}/register`, user);
  }

  login(user: User): Observable<Object>{
    return this.httpClient.post(`${this.AUTH_API}/login`, user);
  }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.AUTH_API}/users`);
  }
  
}
