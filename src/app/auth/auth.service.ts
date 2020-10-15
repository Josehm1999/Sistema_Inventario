import { Injectable } from '@angular/core';
import {Role} from './role.enum'
import { Observable, BehaviorSubject, observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import * as decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import {transformError} from '../common/common';
import { CacheService } from './cache.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService{

  private readonly authProvider: (email:string, password:string) =>Observable<IServerAuthResponse>;
  authStatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || defaultAuthStatus);
  constructor(private httpClient:HttpClient) {
    super();
    this.authStatus.subscribe(authStatus =>{
      this.setItem('authStatus', authStatus);
    });
    this.authProvider = this.userAuthProvider;
   }
  private userAuthProvider(email:string, password: string): Observable<IServerAuthResponse>{
    return this.httpClient.post<IServerAuthResponse>(`${environment.urlServer}/token`, {email:email, password: password});
  }

  login(email:string, password: string): Observable<IAuthStatus>{
    this.logout();
    const loginResponse = this.authProvider(email,password).pipe(
      map(value => {
        this.setToken(value.access_Token);
        const result = decode(value.access_Token);
        return result as IAuthStatus;
      },catchError(transformError))
    );
    loginResponse.subscribe(
      res =>{
        this.authStatus.next(res);
      },
      err =>{
        this.logout();
        return throwError(err);
      }
    );
    return loginResponse;
  }

  logout(){
    this.clearToken();
    this.authStatus.next(defaultAuthStatus);
  }

  private setToken(jwt: string){
    this.setItem('jwt',jwt);
  }
  
  getToken(): string{
    return this.getItem('jwt') || '';
  }

  private clearToken(){
    this.removeItem('jwt');
  }

  getAuthStatus(): IAuthStatus{
    return this.getItem('authStatus');
  }
}

export interface IAuthStatus{
  role: Role;
  primarysid: number;
  unique_name: string;
}
interface IServerAuthResponse{
  access_Token: string;
}

const defaultAuthStatus: IAuthStatus={role: Role.None, primarysid: null, unique_name:null};
