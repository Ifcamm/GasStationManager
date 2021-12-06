import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/api/users';
  private token: string = '';
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private userId: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  createUser(user: User) {
    this.http.post(`${this.url}/signup`, user).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/login']);
    });
  }

  login(identification: string, password: string) {
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        `${this.url}/login`,
        {
          identification,
          password,
        }
      )
      .subscribe((response) => {
        console.log(response);
        this.token = response.token;
        this.userId = response.userId;

        if (this.token !== '') {
          const expirationInSeconds = response.expiresIn;
          this.setAuthTimer(expirationInSeconds);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expirationInSeconds * 1000
          );
          this.saveAuthData(this.token, this.userId, expirationDate);
        }

        this.router.navigate(['/']);
      });
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuth() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }

    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = localStorage.getItem('token')!;
      this.userId = localStorage.getItem('userId')!;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(durationInSeconds: number) {
    setTimeout(() => {
      this.logout();
    }, durationInSeconds * 1000);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private saveAuthData(token: string, userId: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = new Date(localStorage.getItem('expiration')!);

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: expirationDate,
      userId: userId,
    };
  }

  getUser(userId: string) {
    return this.http.get<{ name: string }>(`${this.url}/${userId}`);
  }
  getUserId() {
    return this.userId;
  }
}
