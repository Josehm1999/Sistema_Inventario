import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {CustomerDetailsService} from './customer-details.service';
import { AddOrEditCustomer } from '../models/AddOrEditCustomer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';


export interface DialogData{
  id: number;
}
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  providers: [CustomerDetailsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerDetailsComponent implements OnInit {

  customer: AddOrEditCustomer = new AddOrEditCustomer();
  constructor(private service: CustomerDetailsService,
    public dialogRef:MatDialogRef<EditCustomerComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private ref: ChangeDetectorRef) { 
      this.customerRecuperado(data.id);
     }

  ngOnInit(): void {
  }

  customerRecuperado(id: number): void{
    this.service.getCustomerById(id)
    .subscribe(response =>{
      this.customer = response;
      this.ref.markForCheck();
      });
    };
  }


