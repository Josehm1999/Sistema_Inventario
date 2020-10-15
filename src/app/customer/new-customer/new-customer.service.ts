import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddOrEditCustomer } from '../models/AddOrEditCustomer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewCustomerService {

  constructor(private Http: HttpClient) {

   }

   saveCustomer(data: AddOrEditCustomer): Observable<Response>{
     data.id = undefined;
     return this.Http.post(`${environment.urlServer}/Customer`, data)
     .pipe(
       map((response: any) => response));
   }
}
