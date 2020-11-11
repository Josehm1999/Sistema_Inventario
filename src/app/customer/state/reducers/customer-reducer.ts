import { Customer } from "../../models/customer";
import { CustomerActions, CustomerActionsTypes } from "../actions/customer-actions";

export interface State{
    items: Customer[],
    isLoading: boolean,
    numberOfRecords: number
};
const initialState:State = {
    items: [],
    isLoading: false,
    numberOfRecords: 0
};

export function CustomerListReducer(state= initialState, action: CustomerActions): State {
    switch(action.type){
        case(CustomerActionsTypes.LoadData):
            return {...state, isLoading: true, numberOfRecords:0};
        case(CustomerActionsTypes.LoadDataCompleted):
            return {...state, items:action.payload, isLoading:false, numberOfRecords: action.payload[0].totalRecords};
        default:
            return state;
    }
}

export const getCustomerItems = (state: State)=> state.items;
export const getIsLoading = (state: State) => state.isLoading;
export const getNumberOfRecords = (state: State) => state.numberOfRecords;