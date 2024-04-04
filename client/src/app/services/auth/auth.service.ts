import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private globalService: GlobalService) { }


  private apiUrl = this.globalService.domainUrl + '/Auth';


  login(username: string, password: string): Observable<any> {
    console.log("try login", username, password);

    return this.http.post<any>(`${this.apiUrl}`, { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem('accessToken', res.token);
        })
      );
  }

  logout(): void {
     localStorage.removeItem('accessToken');
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
