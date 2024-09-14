import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);
  private apiUrl = `${environment.apiUrl}/api/user`;
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.authStatus.next(!!token);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  loginUser(token: string): void {
    localStorage.setItem('token', token);
    this.authStatus.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authStatus.next(false);
  }
}
