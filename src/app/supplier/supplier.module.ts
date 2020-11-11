import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierContainerComponent } from './supplier-container.component';
import { SupplierListTableComponent } from './supplier-list-table/supplier-list-table.component';
import { SupplierListCardComponent } from './supplier-list-card/supplier-list-card.component';
import { SupplierRoutingModule } from "./supplier-routing.module";
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {reducers} from './state/reducers'
import { EffectsModule } from '@ngrx/effects';
import { SupplierEffects } from "./state/effects/supplier-effects";
import { SupplierService } from './supplier.service';

@NgModule({
  declarations: [SupplierContainerComponent, SupplierListTableComponent, SupplierListCardComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    StoreModule.forFeature("supplier", reducers),
    EffectsModule.forFeature([SupplierEffects]),
    ReactiveFormsModule
  ],
  providers: [SupplierService]

})
export class SupplierModule { }
