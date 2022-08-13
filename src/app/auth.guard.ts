import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private auth :  AngularFireAuth,
         private authService: AuthService,
         private router : Router){

    }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
        console.log(this.authService.isLoggedIn);
        
        if(!this.authService.isLoggedIn){
           return this.router.navigate(['login']);
        }
        return true;
  }
  
}
