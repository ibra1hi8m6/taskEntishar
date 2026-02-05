import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, CreateUserDto, UpdateUserDto } from '../../models/user';
import { AuthService } from '../auth-services/auth-service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiurl}/Users`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getuser`, { headers: this.getHeaders() });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/getuserbyid/${id}`, { headers: this.getHeaders() });
  }

  createUser(user: CreateUserDto): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/createuser`, user, { headers: this.getHeaders() });
  }

  updateUser(id: string, user: UpdateUserDto): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/updateuserbyid/${id}`,user,{ headers: this.getHeaders() });
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteuserbyid/${id}`,{ headers: this.getHeaders() });
  }
}
