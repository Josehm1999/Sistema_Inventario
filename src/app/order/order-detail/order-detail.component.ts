import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderList } from '../models/order-list';
import {OrderDetailService} from './order-detail.service'

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrderDetailService]
})
export class OrderDetailComponent implements OnInit, AfterViewInit {

  orderId: number;
  orderItem: OrderList = new OrderList();
  public detailColumns: object[] = [];

  constructor(private service: OrderDetailService, private route: ActivatedRoute, private ref: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.detailColumns = this.getDetailsColumns();
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.route.params.subscribe( params =>{
      this.orderId = params.id;
      this.getOrderById(params.id);
    });
  }

  getOrderById(orderId: number): void{
    this.service.GetOrderById(orderId).subscribe(response =>{
      this.orderItem = response;

    })

  }

  private getDetailsColumns(): object[] {
    return [
      {
        name: 'Product',
        flexGrow: 0.5,
        prop: 'productName',
      },
      {
        name: 'unitPrice',
        prop: 'unitPrice',
        flexGrow: 0.5,
      },
      {
        name: 'quantity',
        prop: 'quantity',
        flexGrow: 0.5,
      }
    ];
  }

}
