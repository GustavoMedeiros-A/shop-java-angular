import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env'
import { LoginDto } from './dto/login.dto'
import { Observable } from 'rxjs';
import { ReturnUserDto } from './dto/return.user.dto';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(user: LoginDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signin`, user);
  }

  createUser(user: CreateUserDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, user);
  }

  fetchUsers(): Observable<ReturnUserDto[]> {
    return this.http.get<ReturnUserDto[]>(`${this.apiUrl}/users/all`);
  }
}
