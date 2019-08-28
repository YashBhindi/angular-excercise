import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from './../../config';
import { Tokens } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  isLoginSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  constructor(private http: HttpClient) { }

  login(user: { u_email: string, u_password: string }): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/auth/login`, user)
      .pipe(
        tap(tokens => {
          this.isLoginSubject.next(true);
          this.doLoginUser(user.u_email, tokens);
        }),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

  registerWithGoogle(payload): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/auth/register-with-google`, payload)
      .pipe(
        tap(tokens => {
          this.isLoginSubject.next(true);
          this.doLoginUser(payload.email, tokens);
        }),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

  loginWithGoogle(payload): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/auth/login-with-google`, payload)
      .pipe(
        tap(tokens => {
          this.isLoginSubject.next(true);
          this.doLoginUser(payload.email, tokens);
        }),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

  register(user): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/auth/register`, user)
      .pipe(
        tap(tokens => {
          this.isLoginSubject.next(true);
          this.doLoginUser(user.u_email, tokens);
        }),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }



  logout() {
    return this.http.post<any>(`${config.apiUrl}/auth/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => {
        this.isLoginSubject.next(false);
        this.doLogoutUser();
      }),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }


  isUserLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  refreshToken() {
    return this.http.post<any>(`${config.apiUrl}/auth/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
