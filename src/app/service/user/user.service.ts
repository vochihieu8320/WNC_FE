import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Header: any;
  constructor(private authService: AuthService, private http: HttpClient) { }

  GetNewToken()
  {
    return new Promise(async (resolve, resject)=>{
      const check_expired_token = this.authService.CheckExpiredToken();
 
      if(!check_expired_token)
      {
     
        try {
          const new_auth_user = <any> await this.authService.RefreshToken();     
          this.authService.setLocalUserProfile(new_auth_user.token, new_auth_user.refreshToken)
          resolve(true)
        } catch (error) {
          console.log(error);
          resolve(false)
        }
      }
      else
      {
        resolve(true)
      }
    })
  }

  async CreateHeader(){
    //Can't get local storage because of getting denied from ccd-admin
    await this.GetNewToken();
    const local = <any> localStorage.getItem("currentUser");
    const token = JSON.parse(local)["token"];
    this.Header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  async show(userID:string){
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/users/${userID}`, {headers: this.Header}).toPromise();    

  }

  async currentBide(userID:string, product_id: string){
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/users/${userID}/bide/${product_id}`, {headers: this.Header}).toPromise();  
  }

  async changePwd(body:any)
  {
    await this.CreateHeader();
    return this.http.post(`${environment.apiUrl}/users/change-pwd`, body, {headers: this.Header}).toPromise();  
  }

  async update_me(userID:any, body:any)
  {
    await this.CreateHeader();
    return this.http.patch(`${environment.apiUrl}/users/update_me/${userID}`, body, {headers: this.Header}).toPromise();  
  }

  async like(userID:any, body:any)
  {
    await this.CreateHeader();
    return this.http.post(`${environment.apiUrl}/users/${userID}/like`, body, {headers: this.Header}).toPromise();  
  }

  async commented(body:any)
  {
    await this.CreateHeader();
    return this.http.post(`${environment.apiUrl}/feedbacks`, body, {headers: this.Header}).toPromise();  
  }

  async get_comments(userID:any, skip:any, limit: any)
  {
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/feedbacks?userID=${userID}&skip=${skip}&limit=${limit}`, {headers: this.Header}).toPromise();  
  }

  async bider_seller(body:any)
  {
    await this.CreateHeader();
    return this.http.post(`${environment.apiUrl}/inboxes`, body, {headers: this.Header}).toPromise();  
  }

  async forgotPassword(body:any)
  {
    return this.http.post(`${environment.apiUrl}/users/forgot-pwd`, body).toPromise();  
  }

  async check_forgot_pwd(body:any)
  {
    return this.http.patch(`${environment.apiUrl}/users/forgot-pwd`, body).toPromise();  
  }
}
