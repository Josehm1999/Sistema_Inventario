import { Supplier } from "../../models/supplier";
import { SupplierActions, SupplierActionsTypes } from "../actions/supplier-actions";

export interface State{
    items: Supplier[],
    isVisible: boolean;
};
const initialState:State = {
    items: [],
    isVisible: false
};

export function SupplierListReducer(state= initialState, action: SupplierActions): State {
    switch(action.type){
        case(SupplierActionsTypes.LoadData):
            return {...state, isVisible: true};
        case(SupplierActionsTypes.LoadDataCompleted):
            return {...state, items:action.payload, isVisible: false};
        default:
            return state;
    }
}

export const getSupplierItems = (state: State)=> state.items;
export const getIsVisible = (state: State)=> state.isVisible;
