import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { AuthService } from '../service/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const result =<any> await this.authenticationService.checkLoggin();
    console.log(result);
    if (result) {
      return true;
    } else {
      this.authenticationService.removeCurentUser();
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    
  }
}