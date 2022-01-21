import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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

  async index(skip:any, limit:any, url:string) {
    await this.CreateHeader();
    // `${environment.apiUrl}/products/?skip=${skip}&limit=${limit}
    return this.http.get(`${environment.apiUrl}/products/?skip=${skip}&limit=${limit}&${url}`, 
    {headers: this.Header}).toPromise();
  }

  async hot_trends(){
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/products/best-bider-bide`, {headers: this.Header}).toPromise();
  }

  async best_price(){
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/products/best-price`, {headers: this.Header}).toPromise();
  }

  async last_minute(){
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/products/best-date-end`, {headers: this.Header}).toPromise();
  }


  async auction(productID : string){
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/products/${productID}/auction`, {headers: this.Header}).toPromise();    
  }

  async categories(){
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/categories/short-hand`, {headers: this.Header}).toPromise();  
  }

  async show(productID : string){
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/products/${productID}`, {headers: this.Header}).toPromise();  
  }

  async sugget_price(productID : string){
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/products/${productID}/auction`, {headers: this.Header}).toPromise();      
  }

  async manual_bid(body:any){
    await this.CreateHeader();
    return this.http.post(`${environment.apiUrl}/bides`, body, {headers: this.Header}).toPromise();      
  }

  async userProfile(userID : string){
    await this.CreateHeader();
    return this.http.get(`${environment.apiUrl}/users/${userID}`, {headers: this.Header}).toPromise(); 
  }
}
