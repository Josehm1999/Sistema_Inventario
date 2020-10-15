import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, IAuthStatus } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  protected currentAuthStatus: IAuthStatus;
  constructor( private authService: AuthService, private router: Router){
    this.authService.authStatus.subscribe(
      authStatus => (this.currentAuthStatus = (this.authService.getAuthStatus()))
    )
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkPermission(next);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkPermission(next);
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean>{
    return this.checkLogin();
  }
    
  protected checkLogin(){
    if(this.authService.getToken() == null || this.authService.getToken() === ''){
      alert('Debes iniciar sesión para continuar');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  protected checkPermission(route?:ActivatedRouteSnapshot){
    let roleMatch = true;
    if(route){
      const expectedRole = route.data.expectedRole;
      if(expectedRole){
        roleMatch = this.currentAuthStatus.role ===expectedRole;
      }
    }

    if(!roleMatch){
      alert('No tienes permiso para ver este recurso');
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
