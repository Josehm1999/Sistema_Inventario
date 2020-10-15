import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { MaterialModule } from '../material.module';




@NgModule({
  declarations: [CustomerListComponent, NewCustomerComponent, EditCustomerComponent, CustomerDetailsComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [NewCustomerComponent, EditCustomerComponent, CustomerDetailsComponent]
})
export class CustomerModule { }
