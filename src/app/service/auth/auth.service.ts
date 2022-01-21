import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../model/user.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import jwtDecode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  Header: any
  currentUser: any
  constructor(private http: HttpClient ) { 
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')|| '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  };

  public setUserProfile(property: string, value: any): void {
    const user = <any>this.currentUserValue;
    if (user && user[property]) {
      user[property] = value;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
  };

  async checkLoggin() {
    let currentUser = this.currentUserSubject.value;
    const refreshToken = localStorage.getItem("refreshToken");

    if(refreshToken)
    {
        const current_date = new Date();
        const expired_token = currentUser.exp*1000 
        //check account's token is expired or not
        if((currentUser && expired_token < current_date.getTime()) || !currentUser)
        {         
          // get refreshtoken
          return false;
        }
        else
        {
          return true
        }
    }
    else
    {
      return false;
    }
    
  };

  public setLocalUserProfile(token : string, refreshToken: string): void {
    try {
      const decoded = Object(jwtDecode(token));
      const user: User = {
        ...decoded,
        token
      };

      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('refreshToken', refreshToken);
      this.currentUserSubject.next(user);
    } catch (error) {
      
    }

  }
  removeCurentUser() {
    localStorage.removeItem('currentUser');
  }

  removeRefreshToken()
  {
    localStorage.removeItem('refreshToken');
  }


  CheckExpiredToken()
  {
    let currentUser = this.currentUserSubject.value;
    const current_date = new Date();
    const expired_token = currentUser.exp*1000
    if((currentUser && expired_token < current_date.getTime()) || !currentUser)
    {
        return false;
    }
    return true;
  }

  async login(body:any) {
    return await this.http.post(`${environment.apiUrl}/users/login`, body).toPromise()
  }

  async register(body:any) {
    return await this.http.post(`${environment.apiUrl}/users/register`, body).toPromise()
  }

  async getOtp(body: any) {
    return await this.http.post(`${environment.apiUrl}/otp`, body).toPromise();
  }

  async checkOTP(body: any) {
    return await this.http.patch(`${environment.apiUrl}/otp`, body).toPromise();    
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('refreshToken');
  };

  RefreshToken()
  {
    const local = <any> localStorage.getItem("refreshToken");
    const current_user = <any> localStorage.getItem('currentUser');

    const refreshToken =local;
    const email = JSON.parse(current_user)["email"];

    const data = {
      email: email,
      refreshToken: refreshToken
    }
    return this.http.post(`${environment.apiUrl}/users/refreshToken`,data).toPromise();
  }
}
