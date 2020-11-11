import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddOrEditCustomer } from '../models/AddOrEditCustomer';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditCustomerService {

  constructor(private http: HttpClient) { }

  getCustomerById(int: number): Observable<AddOrEditCustomer>{
    return this.http.get<AddOrEditCustomer>(`${environment.urlServer}/Customer/${int}`)
  }

  editCustomer(data:AddOrEditCustomer): Observable<Response>{
    return this.http.put(`${environment.urlServer}/Customer`, data)
    .pipe(
      map((response:any)=> response ));
  }
}
