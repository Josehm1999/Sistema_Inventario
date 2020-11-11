import { Injectable } from '@angular/core';
import { CustomerService } from '../../customer-list/customer.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CustomerActionsTypes, LoadData, LoadDataCompleted } from '../actions/customer-actions';
import { map, switchMap } from "rxjs/operators";
@Injectable()
export class CustomerEffects {
  constructor(
    private customerService: CustomerService,
    private actions$: Actions
  ) {}

  @Effect()
  initLoad$ = this.actions$.pipe(
      ofType<LoadData>(CustomerActionsTypes.LoadData),
      switchMap(action => this.customerService.getCustomerList(action.page, action.rows)),
      map(items => new LoadDataCompleted(items))
  )
}
