import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderList } from "../models/order-list";

@Injectable({
  providedIn: 'root'
})
export class OrderContainerService {

  constructor(private http: HttpClient) { }

  getOrderList(page: number, rows: number): Observable<OrderList[]>{
return this.http.get<OrderList[]>(`${environment.urlServer}/Order/GetPaginatedOrders/${page}/${rows}`);
  }
}
