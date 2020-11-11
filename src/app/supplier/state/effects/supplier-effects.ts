import { Injectable } from '@angular/core';
import { SupplierService } from "../../supplier.service";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SupplierActionsTypes, LoadData, LoadDataCompleted } from '../actions/supplier-actions';
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class SupplierEffects {
  constructor(
    private supplierService: SupplierService,
    private actions$: Actions
  ) {}

  @Effect()
  initLoad$ = this.actions$.pipe(
      ofType<LoadData>(SupplierActionsTypes.LoadData),
      switchMap(action => this.supplierService.getSupplierList(action.page, action.rows, action.searchTerm)),
      map(items => new LoadDataCompleted(items))
  )
}