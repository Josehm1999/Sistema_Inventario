import {Action} from '@ngrx/store';
import {Supplier} from '../../models/supplier';

export enum SupplierActionsTypes {
    LoadData = '[Supplier] LoadData',
    LoadDataCompleted = '[Supplier] LoadDataCompleted'
}

export class LoadData implements Action {
    readonly type = SupplierActionsTypes.LoadData;
    constructor(public page: number, public rows: number, public searchTerm: string){}
}

export class LoadDataCompleted implements Action{
    readonly type = SupplierActionsTypes.LoadDataCompleted;
    constructor(public payload: Supplier[]){}
}

export type SupplierActions = LoadData | LoadDataCompleted;