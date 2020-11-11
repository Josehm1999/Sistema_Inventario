import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
  } from '@ngrx/store';

  import * as fromSupplier from '../reducers/supplier-reducer';

  export interface SupplierState {
      supplier : fromSupplier.State;
  };

  export const reducers: ActionReducerMap<SupplierState> = {
    supplier: fromSupplier.SupplierListReducer,
  };

  export const getSupplierModuleState = createFeatureSelector<SupplierState>(
      'supplier'
  );

  export const getSupplierState = createSelector(
    getSupplierModuleState,
    (state) => state.supplier
  );

  export const getSupplierItems = createSelector(
    getSupplierState,
    fromSupplier.getSupplierItems
  );

  export const getIsVisible = createSelector(
      getSupplierState,
      fromSupplier.getIsVisible
  );