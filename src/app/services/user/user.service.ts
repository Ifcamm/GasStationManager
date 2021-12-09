import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment.prod';

const url = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: string = '';
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private userId: string = '';
  private userRole: string = '';
  private identification: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  createUser(user: User) {
    this.http.post(`${url}/createuser`, user).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }

  signup(user: User) {
    this.http.post(`${url}/signup`, user).subscribe((response) => {
      this.router.navigate(['/login']);
    });
  }

  login(identification: string, password: string) {
    this.identification = identification;
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        userRole: string;
      }>(`${url}/login`, {
        identification,
        password,
      })
      .subscribe((response) => {
        this.token = response.token;
        this.userId = response.userId;
        this.userRole = response.userRole;

        if (this.token !== '') {
          const expirationInSeconds = response.expiresIn;
          this.setAuthTimer(expirationInSeconds);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expirationInSeconds * 1000
          );
          this.saveAuthData(
            this.token,
            this.userId,
            this.userRole,
            expirationDate,
            this.identification
          );
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
    this.userId = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.userRole = '';
    this.router.navigate(['/']);
    this.identification = '';
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
      this.userRole = localStorage.getItem('userRole')!;
      this.identification = localStorage.getItem('identification')!;
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
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('identification');
  }

  private saveAuthData(
    token: string,
    userId: string,
    userRole: string,
    expirationDate: Date,
    identification: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('identification', identification);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const expirationDate = new Date(localStorage.getItem('expiration')!);
    const identification = localStorage.getItem('identification');

    if (!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      userId: userId,
      userRole: userRole,
      expirationDate: expirationDate,
      identification: identification,
    };
  }

  getUser(userId: string) {
    return this.http.get<{ name: string }>(`${url}/${userId}`);
  }
  getUserId() {
    return this.userId;
  }
  getUserRole() {
    return this.userRole;
  }
  getIdentification() {
    return this.identification;
  }
}
