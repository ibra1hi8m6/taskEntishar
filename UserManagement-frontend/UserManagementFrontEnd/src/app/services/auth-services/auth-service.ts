import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginDto, LoginResponse } from '../../models/user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiurl}/Auth`;

  private currentUserSubject =
    new BehaviorSubject<LoginResponse | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      const userData = this.getUserDataFromToken();
      this.currentUserSubject.next(userData);
    }
  }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, loginDto)
      .pipe(
        tap(response => {
          localStorage.setItem('jwt_token', response.token);

          const userData = this.getUserDataFromToken(response.token);
          this.currentUserSubject.next(userData);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private getUserDataFromToken(token?: string): LoginResponse | null {
    const jwt = token ?? this.getToken();
    if (!jwt) return null;

    const decoded = this.decodeToken(jwt);
    if (!decoded) return null;

    return {
      token: jwt,
      username: decoded.username,
      
    };
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}
