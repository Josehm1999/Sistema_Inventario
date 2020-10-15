import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierContainerComponent } from './supplier-container.component';
import { SupplierListTableComponent } from './supplier-list-table/supplier-list-table.component';
import { SupplierListCardComponent } from './supplier-list-card/supplier-list-card.component';
import { SupplierRoutingModule } from "./supplier-routing.module";
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SupplierContainerComponent, SupplierListTableComponent, SupplierListCardComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SupplierModule { }
