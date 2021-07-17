import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import {AuthResponseData, AuthUser} from '../models/Auth';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly ROOT_ENDPOINT = 'AIzaSyAuCLLboAZuO_yndljGGYilj4K4Ft2ow30';
  authUser = new BehaviorSubject<AuthUser>(null);
  private tokenExpirationTimer: any;

  constructor(private router: Router, public http: HttpClient) {}

  login(user) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
      + AuthService.ROOT_ENDPOINT, {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  register(user) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
      + AuthService.ROOT_ENDPOINT, {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      password: user.password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const authUser = new AuthUser(
      email,
      userId,
      token,
      expirationDate);
    this.authUser.next(authUser);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(authUser));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email doees not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct!';
        break;
    }
    return throwError(errorMessage);
  }

  logout() {
    this.authUser.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadUser = new AuthUser(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadUser.token) {
      this.authUser.next(loadUser);
      // @ts-ignore
      const expirationDuration = new Date(userData._tokenExpirationDate) - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }
}
