import {Action} from '@ngrx/store';
import {Customer} from '../../models/customer';

export enum CustomerActionsTypes {
    LoadData = '[Customer] LoadData',
    LoadDataCompleted = '[Customer] LoadDataCompleted'
}

export class LoadData implements Action {
    readonly type = CustomerActionsTypes.LoadData;
    constructor(public page: number, public rows: number){}
}

export class LoadDataCompleted implements Action{
    readonly type = CustomerActionsTypes.LoadDataCompleted;
    constructor(public payload: Customer[]){}
}

export type CustomerActions = LoadData | LoadDataCompleted;