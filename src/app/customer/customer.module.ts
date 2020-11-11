import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from "./state/reducers";
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffects } from "./state/effects/customer-effects";
import { CustomerService } from './customer-list/customer.service';


@NgModule({
  declarations: [CustomerListComponent, NewCustomerComponent, EditCustomerComponent, CustomerDetailsComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature("customer", reducers),
    EffectsModule.forFeature([CustomerEffects])
  ],
  providers: [CustomerService],
  entryComponents: [NewCustomerComponent, EditCustomerComponent, CustomerDetailsComponent]
})
export class CustomerModule { }
